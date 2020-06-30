import { ILoader } from './ILoader';
import { DataFrame, createColumns, inferColumnTypes, pushValues } from '../DataFrame';
import parse, { Parser } from 'csv-parse';
import { Result, Ok } from '../utils';
import { TaskEither, left, tryCatch, chain as chainTE, right } from 'fp-ts/es6/TaskEither';
import { pipe } from 'fp-ts/es6/pipeable';
import { chain, fold } from 'fp-ts/es6/Either';
import wretch from 'wretch';

export interface CSVLoaderSettings {
  /* If true, take first row as column names. Default: false */
  columns: boolean;

  /* If true, treat input string as url and attempt to download CSV. Default: false */
  download: boolean;
}

const defaultSettings: CSVLoaderSettings = {
  columns: true,
  download: false,
};

export class CSVLoader implements ILoader {
  loadUrl(url: string, settings: CSVLoaderSettings = defaultSettings): TaskEither<Error, DataFrame> {
    const fetchTask = tryCatch<Error, any>(
      () =>
        wretch(url)
          .get()
          .text(),
      reason => new Error(String(reason)),
    );

    return pipe(
      fetchTask,
      chainTE((csv: string) => this.loadString(csv, settings)),
    );
  }

  loadString(str: string, settings: CSVLoaderSettings = defaultSettings): TaskEither<Error, DataFrame> {
    if (!settings.columns) {
      return left(new Error('Option `columns === false` is not yet supported.'));
    }

    const parser: Parser = parse(str, {
      columns: settings.columns,
      info: true,
    });

    let frame: DataFrame = { name: 'Imported CSV', columns: {} };
    return pipe(
      this.parseCSV(parser, frame, settings),
      chainTE((df: DataFrame) => right(inferColumnTypes(df))),
    );
  }

  private parseCSV(parser: Parser, frame: DataFrame, settings: CSVLoaderSettings): TaskEither<Error, DataFrame> {
    const processLine = (df: Result<DataFrame>, line: any): Result<DataFrame> => {
      const addColumns = (df: DataFrame): Result<DataFrame> => {
        if (line.info.records === 0) {
          const columns: string[] = settings.columns ? Object.keys(line.record) : [];
          return createColumns(frame, columns);
        }
        return Ok(df);
      };
      const addValues = (values: string[]) => (df: DataFrame): Result<DataFrame> => Ok(pushValues(df, values));
      return pipe(df, chain(addColumns), chain(addValues(Object.values(line.record))));
    };

    return tryCatch<Error, DataFrame>(
      () =>
        new Promise(async (resolve, reject) => {
          let df: Result<DataFrame> = Ok(frame);
          for await (const line of parser) {
            df = processLine(df, line);
            fold(
              error => reject(error),
              _ => {},
            )(df);
          }

          fold(
            error => reject(error),
            (frame: DataFrame) => resolve(frame),
          )(df);
        }),
      reason => new Error(String(reason)),
    );
  }
}
