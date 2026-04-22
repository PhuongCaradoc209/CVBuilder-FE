import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SectionToolbarProps {
  title: string;
  onAdd: () => void;
}

export function SectionToolbar({ title, onAdd }: SectionToolbarProps) {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <p className='text-muted-foreground text-sm font-medium'>{title}</p>
      <Button type='button' variant='outline' size='sm' className='border-border' onClick={onAdd}>
        <span className='inline-flex items-center gap-1'>
          <Plus className='h-4 w-4' />
          Add
        </span>
      </Button>
    </div>
  );
}
