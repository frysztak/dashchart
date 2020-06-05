import { useRouter } from 'next/router';
import { AppState, ID } from './state';
import { isNumeric } from 'shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentProject } from './current';
import { Project } from './project';
import { useCurrentProjectId } from './selectors';

export function useCurrentProject(): Project | null {
  const router = useRouter();
  const dispatch = useDispatch();

  const isProjectIdValid: boolean = 'projectId' in router.query && isNumeric(router.query.projectId);
  const projectId: ID | null = isProjectIdValid ? +router.query.projectId! : null;
  const currentProjectId: number | null = useCurrentProjectId();

  useEffect(() => {
    if (projectId !== null && projectId !== currentProjectId) {
      dispatch(setCurrentProject(projectId));
    }
  });

  return useSelector((state: AppState) => (projectId === null ? null : state.projects[projectId]));
}
