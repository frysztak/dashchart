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
    try {
      const dataFrame = await prisma.dataFrame.update({
        where: {
          id: dataFrameId,
        },
        data: req.body,
      });

      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          updatedAt: new Date(),
        },
      });
      res.json(dataFrame);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Only PUT method is supported');
  }
}
