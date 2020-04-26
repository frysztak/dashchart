import { DataFrame } from '../DataFrame/DataFrame';

export interface ILoader {
  load(url: string): Promise<DataFrame>;
}
