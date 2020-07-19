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
    const [project, dataFrameCount, chartCount] = await Promise.all([
      prisma.project.findOne({
        where: {
          id: projectId,
        },
      }),
      prisma.dataFrame.count({
        where: {
          projectId: projectId,
        },
      }),
      prisma.chart.count({
        where: {
          projectId: projectId,
        },
      }),
    ]);

    if (!project) {
      return res.status(500).send(`ProjectId ${projectId} not found`);
    }
    return res.send({
      ...project,
      dataFrameCount,
      chartCount,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
