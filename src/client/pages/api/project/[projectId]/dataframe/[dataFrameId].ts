import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseNumericParameter } from '../../../../../utils/APIRouterParsers';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const projectId: number | Error = parseNumericParameter(req, 'projectId');
  const dataFrameId: number | Error = parseNumericParameter(req, 'dataFrameId');
  if (projectId instanceof Error) {
    res.status(500).send(projectId.message);
    return;
  }
  if (dataFrameId instanceof Error) {
    res.status(500).send(dataFrameId.message);
    return;
  }

  if (req.method === 'PUT') {
    const dataFrame = await prisma.dataFrame.update({
      where: {
        id: dataFrameId,
      },
      data: req.body,
    });
    res.json(dataFrame);
  } else {
    res.status(500).send('Only POST and PUT methods are supported');
  }
}
