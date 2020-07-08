import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseNumericParameter } from '../../../utils/APIRouterParsers';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const projectId: number | Error = parseNumericParameter(req, 'projectId');
  if (projectId instanceof Error) {
    res.status(500).send(projectId.message);
    return;
  }

  if (req.method === 'GET') {
    const project = await prisma.project.findOne({
      where: {
        id: projectId,
      },
    });

    if (project === null) {
      res.status(500).send({ error: `Project ${projectId} not found` });
    } else {
      res.json(project);
    }
  } else if (req.method === 'POST') {
    const project = await prisma.project.create({
      data: req.body,
    });
    if (project === null) {
      res.status(500).send({ error: `Failed to create project ${projectId}` });
    } else {
      res.json(project);
    }
  }
}
