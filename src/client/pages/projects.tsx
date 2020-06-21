import { useProjects } from '../store/selectors';
import { Project } from '../store/project';
import React from 'react';
import Link from 'next/link';
import { routes } from '../config/routes';
import Head from 'next/head';

function Projects() {
  const projects: Project[] = useProjects();

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <ul>
        {projects.map((project: Project) => (
          <li key={project.id}>
            <Link {...routes.project(project.id)}>
              <a>{project.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Projects;
