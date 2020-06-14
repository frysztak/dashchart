import { DataFrame } from '../DataFrame';
import { TaskEither } from 'fp-ts/es6/TaskEither';

export interface ILoader {
  loadUrl(url: string): TaskEither<Error, DataFrame>;
  loadString(str: string): TaskEither<Error, DataFrame>;
}
