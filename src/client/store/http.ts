import wretch from 'wretch';

export const http = wretch(`${process.env.NEXT_PUBLIC_URL}/api`);
