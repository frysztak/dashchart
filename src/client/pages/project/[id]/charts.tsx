import { useRouter } from 'next/router';

export default function Charts() {
  const router = useRouter();
  const { id } = router.query;

  return <>Charts at project id {id}</>;
}
