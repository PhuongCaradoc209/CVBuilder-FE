import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './router';

function App() {
  const appRoutes = useRoutes(routes);

  return <Suspense fallback={<div className='flex h-screen items-center justify-center'>loading...</div>}>{appRoutes}</Suspense>;
}

export default App;
