import { Either, left, right, Right } from 'fp-ts/es6/Either';

export type Result<T> = Either<Error, T>;
export const Err = (err: string) => left(new Error(err));
export const Ok = right;
export const takeRight = <T>(result: Result<T>): T => (result as Right<T>).right;
