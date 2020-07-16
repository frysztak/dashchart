import { useProjects } from '../store/selectors';
import { fetchProjects, LoadingState, createProject as createProjectAction } from '../store/project';
import React, { useEffect } from 'react';
import { routes } from '../config/routes';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '../components/misc/ErrorMessage';
import { Spinner } from '../components/misc/Spinner';
import { Box, Flex } from 'reflexbox';
import { ProjectPreview } from '../components/misc/ProjectPreview';
import { useRouter } from 'next/router';
import { ID } from '../store/state';
import { CreateNewProjectCard } from '../components/misc/CreateNewProjectCard';

function Projects() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { projects, state, errorMessage, createProject } = useProjects();

  useEffect(() => {
    if (Object.keys(projects).length === 0) {
      dispatch(fetchProjects());
    }
  }, []);

  const navigateToPage = (projectId: ID) => () => {
    const route = routes.dataFrames(projectId);
    router.push(route.href, route.as);
  };

  const createNewProject = (projectName: string) => {
    dispatch(createProjectAction(projectName));
  };

  const body = () => {
    switch (state) {
      case LoadingState.LOADING:
        return <Spinner />;
      case LoadingState.IDLE:
        return (
          <Flex flexWrap={'wrap'}>
            {Object.values(projects).map(project => (
              <Box m={5} marginTop={4} key={project.id}>
                <ProjectPreview project={project} onClick={navigateToPage(project.id)} />
              </Box>
            ))}

            <Box m={5} marginTop={4}>
              <CreateNewProjectCard submit={createNewProject} state={createProject.state} />
            </Box>
          </Flex>
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
