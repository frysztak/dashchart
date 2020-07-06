import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { isNumeric } from 'shared/utils/Collection';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const projectIdQuery: string | string[] = req.query.projectId;

  if (Array.isArray(projectIdQuery) || !isNumeric(projectIdQuery)) {
    res.status(500).send({ error: `ProjectId ${projectIdQuery} is invalid` });
    return;
  }

  const projectId: number = +projectIdQuery;
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
