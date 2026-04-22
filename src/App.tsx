import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/common/ScrollToTop';

function App() {
  const appRoutes = useRoutes(routes);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Thử lại 1 lần nếu lỗi
        refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
        staleTime: 5 * 60 * 1000, // Dữ liệu được coi là mới trong 5 phút
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Suspense fallback={<div className='flex h-screen items-center justify-center'>loading...</div>}>
        {appRoutes}
      </Suspense>
      <Toaster position='top-right' expand={false} richColors theme='light' />
    </QueryClientProvider>
  );
}

export default App;
