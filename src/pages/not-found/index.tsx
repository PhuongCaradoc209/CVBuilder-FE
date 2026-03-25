import { FileQuestion, Home, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { NAV_PATH } from '@/router/router.constant';

export default function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-xl text-center'>
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100'>
          <FileQuestion className='h-10 w-10 text-orange-500' />
        </div>

        <h1 className='text-6xl font-bold text-gray-900'>404</h1>

        <p className='mt-4 text-xl font-medium text-gray-700'>Page Not Found</p>

        <p className='mt-2 text-gray-500'>Sorry, the page you are looking for does not exist or has been removed.</p>
        <p className='mt-2 text-gray-500'>Xin lổi, trang bạn tìm kiếm bị xóa gòi</p>
        <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
          <Button asChild className='h-12 rounded-full bg-orange-500 px-8 text-base text-white hover:bg-orange-600'>
            <Link to={NAV_PATH.DASHBOARD}>
              <Home className='mr-2 h-4 w-4' />
              Back to Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant='outline'
            className='h-12 rounded-full border-orange-200 px-8 text-base text-orange-600 hover:bg-orange-50 hover:text-orange-700'>
            <Link to={NAV_PATH.AUTH.LOGIN}>
              <LogIn className='mr-2 h-4 w-4' />
              Go to Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
