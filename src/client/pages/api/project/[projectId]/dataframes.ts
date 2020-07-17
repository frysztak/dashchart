import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseNumericParameter } from '../../../../utils/APIRouterParsers';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const projectId: number | Error = parseNumericParameter(req, 'projectId');
  if (projectId instanceof Error) {
    res.status(500).send(projectId.message);
    return;
  }

  try {
    if (req.method === 'GET') {
      const dataFrames = await prisma.dataFrame.findMany({
        where: {
          projectId: projectId,
        },
      });
      res.json(dataFrames);
    } else if (req.method === 'POST') {
      const dataFrame = await prisma.dataFrame.create({
        data: {
          ...req.body,
          project: {
            connect: { id: projectId },
          },
        },
      });
      res.json(dataFrame);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
