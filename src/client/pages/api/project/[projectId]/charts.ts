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

  if (req.method === 'GET') {
    try {
      const charts = await prisma.chart.findMany({
        where: {
          projectId: projectId,
        },
      });
      res.json(charts);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else if (req.method === 'POST') {
    try {
      const chart = await prisma.chart.create({
        data: {
          ...req.body,
          project: {
            connect: { id: projectId },
          },
        },
      });

      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          updatedAt: new Date(),
        },
      });
      res.json(chart);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
