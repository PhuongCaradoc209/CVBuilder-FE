import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EntryCardProps {
  title: string;
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
  canRemove?: boolean;
}

export function EntryCard({ title, index, onRemove, children, canRemove = true }: EntryCardProps) {
  return (
    <div className='border-border bg-background rounded-2xl border p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h4 className='text-foreground text-sm font-semibold'>
          {title} {index + 1}
        </h4>

        {canRemove && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='text-muted-foreground hover:text-destructive'
            onClick={onRemove}>
            <Trash2 className='h-4 w-4' />
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}

export function FormLabel({ children }: { children: string }) {
  return <label className='text-foreground text-sm font-medium'>{children}</label>;
}

import { Plus } from 'lucide-react';

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
