import { DataFrame } from '../DataFrame';

export interface ILoader {
  load(url: string): Promise<DataFrame>;
}
