import { useRoutes } from 'react-router-dom';
import { APP_ROUTES } from './config';
import { MainLayout } from '../components/layouts';
import { Spinner } from '../components/ui/Spinner';
import { Suspense } from 'react';

export function AppRouter(){
  const element = useRoutes([
    {
      element: <MainLayout />,
      children: APP_ROUTES,
    }
  ]);
  return (
    <Suspense fallback={<Spinner />}>{element}</Suspense>
  );
}
