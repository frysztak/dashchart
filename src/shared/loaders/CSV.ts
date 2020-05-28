import { ILoader } from './ILoader';
import { DataFrame, createColumns, inferColumnTypes, pushValues } from '../DataFrame';
import parse from 'csv-parse';
import { takeRight } from '../utils';

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
  async load(url: string, settings: CSVLoaderSettings = defaultSettings): Promise<DataFrame> {
    if (!settings.columns) {
      throw new Error('Option `columns === false` is not yet supported.');
    }

    let frame: DataFrame = { name: 'Imported CSV', columns: {} };
    const parser: parse.Parser = parse(url, {
      columns: settings.columns,
      info: true,
    });

    for await (const line of parser) {
      if (line.info.records === 0) {
        const columns: string[] = settings.columns ? Object.keys(line.record) : [];
        // FIXME
        frame = takeRight(createColumns(frame, columns));
      }
      frame = pushValues(frame, Object.values(line.record));
    }

    return inferColumnTypes(frame);
  }
}
