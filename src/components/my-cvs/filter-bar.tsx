import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NAV_PATH } from '@/router/router.constant';

interface FilterBarProps {
  totalCount: number;
  currentCount: number;
  onSearchChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onTemplateChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function FilterBar({
  totalCount,
  currentCount,
  onSearchChange,
  onTagChange,
  onTemplateChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className='mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
      <div className='flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
        <div className='flex flex-1 flex-col gap-3'>
          <div className='relative max-w-xl'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <Input
              placeholder='Search your CVs...'
              className='h-11 rounded-xl border-slate-200 bg-slate-50 pl-10'
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex flex-col gap-3 md:flex-row'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-slate-500'>Filter by Tag</span>
                <Select onValueChange={onTagChange} defaultValue='all'>
                  <SelectTrigger className='w-[170px] rounded-xl border-slate-200 bg-slate-50'>
                    <SelectValue placeholder='All Tags' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Tags</SelectItem>
                    <SelectItem value='work'>Work</SelectItem>
                    <SelectItem value='freelance'>Freelance</SelectItem>
                    <SelectItem value='personal'>Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex items-center gap-2'>
                <span className='text-sm text-slate-500'>Template</span>
                <Select onValueChange={onTemplateChange} defaultValue='all'>
                  <SelectTrigger className='w-[170px] rounded-xl border-slate-200 bg-slate-50'>
                    <SelectValue placeholder='All Templates' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Templates</SelectItem>
                    <SelectItem value='modern'>Modern</SelectItem>
                    <SelectItem value='classic'>Classic</SelectItem>
                    <SelectItem value='creative'>Creative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex items-center gap-2'>
                <span className='text-sm text-slate-500'>Sort by</span>
                <Select onValueChange={onSortChange} defaultValue='last-edited'>
                  <SelectTrigger className='w-[170px] rounded-xl border-slate-200 bg-slate-50'>
                    <SelectValue placeholder='Last Edited' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='last-edited'>Last Edited</SelectItem>
                    <SelectItem value='name'>Name</SelectItem>
                    <SelectItem value='rating'>Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className='text-sm text-slate-500'>
              Showing <span className='font-medium text-slate-700'>{currentCount}</span> on this page
              <span className='mx-2 text-slate-300'>•</span>
              <span className='font-medium text-slate-700'>{totalCount}</span> total results
            </p>
          </div>
        </div>

        <Button asChild className='h-11 rounded-xl bg-orange-500 px-5 text-white hover:bg-orange-600'>
          <Link to={NAV_PATH.APP.CREATE_CV}>Create New CV</Link>
        </Button>
      </div>
    </div>
  );
}
