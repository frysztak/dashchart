import { useRouter } from 'next/router';
import { routes } from '../../config/routes';
import { useEffect } from 'react';
import { useCurrentProject } from '../../store/hooks';
import { Project } from '../../store/project';

function ProjectPage() {
  const router = useRouter();
  const project: Project | null = useCurrentProject();

  useEffect(() => {
    if (project !== null) {
      const route = routes.charts(project.id);
      router.push(route.href, route.as);
    }
  });

  return <></>;
}

export default ProjectPage;
