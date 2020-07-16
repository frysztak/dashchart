import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany();
    return res.json(projects);
  } else if (req.method === 'POST') {
    const project = await prisma.project.create({
      data: req.body,
    });
    if (project === null) {
      res.status(500).send({ error: `Failed to create project` });
    } else {
      res.json(project);
    }
  } else {
    res.status(500).send('Only POST and GET methods are supported');
  }
}
