import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { routes } from '../config/routes';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const route = routes.projects;
    router.push(route.href, route.as);
  });

  return <></>;
}
