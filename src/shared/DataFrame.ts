import produce, { Draft } from 'immer';

export enum ColumnType {
  STRING,
  NUMBER,
}

export type Column =
  | {
      type: ColumnType.NUMBER;
      values: number[];
    }
  | {
      type: ColumnType.STRING;
      values: string[];
    };

export class DataFrame {
  private columns: Map<string, Column>;

  constructor(data?: Map<string, Column>) {
    if (data) {
      this.columns = produce(data, (draft: Draft<Map<string, Column>>) => (draft = data));
    } else {
      this.columns = new Map<string, Column>();
    }
  }

  createColumn(columnName: string, type: ColumnType = ColumnType.STRING) {
    this.columns = produce(this.columns, (draft: Draft<Map<string, Column>>) => {
      if (!draft.has(columnName)) {
        draft.set(columnName, { type: type, values: [] });
      }
    });
  }

  createColumns(columnNames: string[]) {
    for (const columnName of columnNames) {
      this.createColumn(columnName);
    }
  }

  push(values: string[]) {
    this.columns = produce(this.columns, (draft: Draft<Map<string, Column>>) => {
      let idx = 0;
      for (const column of draft.values()) {
        if (column.type === ColumnType.STRING) {
          column.values = [...column.values, values[idx]];
        }
        idx++;
      }
    });
  }

  column(name: string): Column | null {
    return this.columns.has(name) ? this.columns.get(name)! : null;
  }
}
