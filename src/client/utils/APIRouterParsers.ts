import { NextApiRequest } from 'next';
import { isNumeric } from 'shared/utils/Collection';

export function parseNumericParameter(req: NextApiRequest, param: string): number | Error {
  const paramQuery: string | string[] = req.query[param];

  if (Array.isArray(paramQuery) || !isNumeric(paramQuery)) {
    return new Error(`${param} ${paramQuery} is invalid`);
  }

  return +paramQuery;
}
