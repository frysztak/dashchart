import { ILoader } from './ILoader';
import { DataFrame } from '../DataFrame/DataFrame';
import parse from 'csv-parse';

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

    const frame = new DataFrame();
    const parser: parse.Parser = parse(url, {
      columns: settings.columns,
      info: true,
    });

    for await (const line of parser) {
      if (line.info.records === 0) {
        const columns: string[] = settings.columns ? Object.keys(line.record) : [];
        frame.createColumns(columns);
      }
      frame.push(Object.values(line.record));
    }

    frame.inferColumnTypes();

    return frame;
  }
}
