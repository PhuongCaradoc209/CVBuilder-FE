import React from 'react';
import { Download, Trash2, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResumeCardProps {
  title: string;
  updated: string;
  template: string;
  image: string;
  isStarred: boolean;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ title, updated, template, image, isStarred }) => {
  return (
    <Card className='group bg-card flex flex-col overflow-hidden rounded-[32px] border shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl'>
      <div className='bg-secondary relative aspect-[16/9] overflow-hidden'>
        <img
          src={image}
          alt={title}
          className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
        />
        <div className='absolute top-4 right-4'>
          <Button
            variant='ghost'
            size='icon'
            className='bg-background/90 hover:bg-background h-10 w-10 rounded-full shadow-md backdrop-blur-sm transition-all active:scale-90'>
            <Star className={`h-5 w-5 ${isStarred ? 'fill-primary text-primary' : 'text-gray-400/50'}`} strokeWidth={2} />
          </Button>
        </div>
      </div>

      <CardContent className='flex flex-1 flex-col p-8'>
        <h3 className='text-[22px] font-bold tracking-tight text-neutral-900'>{title}</h3>
        <div className='mb-8 flex items-center gap-2 text-[15px] font-normal text-gray-400'>
          <span>{updated}</span>
          <span className='text-gray-400/50'>•</span>
          <span>{template}</span>
        </div>

        <div className='mt-auto grid grid-cols-2 gap-5'>
          <Button
            variant='outline'
            className='hover:bg-accent flex h-[50px] items-center justify-center gap-2 rounded-xl text-[15px] font-bold text-neutral-900 transition-all hover:text-neutral-900 active:scale-95'>
            <Download size={18} strokeWidth={2.5} /> PDF
          </Button>
          <Button
            variant='outline'
            className='hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive flex h-[50px] items-center justify-center gap-2 rounded-xl text-[15px] font-bold text-gray-400 transition-all active:scale-95'>
            <Trash2 size={18} strokeWidth={2.5} /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
