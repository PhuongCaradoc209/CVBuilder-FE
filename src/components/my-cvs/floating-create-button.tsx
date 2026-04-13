import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { NAV_PATH } from '@/router/router.constant';

export function FloatingCreateButton() {
  return (
    <div className='fixed right-6 bottom-6 z-40 md:hidden'>
      <Button asChild className='h-14 w-14 rounded-full bg-orange-500 p-0 shadow-lg hover:bg-orange-600 hover:shadow-xl'>
        <Link to={NAV_PATH.APP.CREATE_CV} title='Create New CV' aria-label='Create New CV'>
          <Plus className='h-6 w-6 text-white' />
        </Link>
      </Button>
    </div>
  );
}
