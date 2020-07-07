import { useProjects } from '../store/selectors';
import { fetchProjects, LoadingState, Project } from '../store/project';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { routes } from '../config/routes';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '../components/misc/ErrorMessage';
import { Spinner } from '../components/misc/Spinner';

function Projects() {
  const dispatch = useDispatch();
  const { projects, state, errorMessage } = useProjects();

  useEffect(() => {
    if (Object.keys(projects).length === 0) {
      dispatch(fetchProjects());
    }
  }, []);

  const body = () => {
    switch (state) {
      case LoadingState.LOADING:
        return <Spinner />;
      case LoadingState.IDLE:
        return (
          <ul>
            {Object.values(projects).map((project: Project) => (
              <li key={project.id}>
                <Link {...routes.dataFrames(project.id)}>
                  <a>{project.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        );
      case LoadingState.ERROR:
        return <ErrorMessage message={errorMessage || 'Unknown error'} />;
    }
  };

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      {body()}
    </>
  );
}

export default Projects;
