import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseNumericParameter } from '../../../../../utils/APIRouterParsers';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const projectId: number | Error = parseNumericParameter(req, 'projectId');
  const chartId: number | Error = parseNumericParameter(req, 'chartId');
  if (projectId instanceof Error) {
    res.status(500).send(projectId.message);
    return;
  }
  if (chartId instanceof Error) {
    res.status(500).send(chartId.message);
    return;
  }

  if (req.method === 'PUT') {
    try {
      const chart = await prisma.chart.update({
        where: {
          id: chartId,
        },
        data: req.body,
      });
      res.json(chart);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(500).send('Only PUT method is supported');
  }
}
