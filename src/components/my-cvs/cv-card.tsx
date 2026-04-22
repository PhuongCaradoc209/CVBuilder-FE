import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock3, Download, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { NAV_PATH } from '@/router/router.constant';
import { cvService } from '@/services/cv.service';

type PreviewStyle = 'orange' | 'paper' | 'dark' | 'beige' | 'navy' | 'slate';

interface CVCardProps {
  id: string;
  title: string;
  status: 'DRAFT' | 'FINAL' | 'COMPLETED';
  lastEdited: string;
  rating: number;
  image?: string;
  previewStyle?: PreviewStyle;
}

const statusStyles: Record<CVCardProps['status'], string> = {
  DRAFT: 'rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wide text-orange-600',
  FINAL: 'rounded-md bg-orange-500 px-2 py-1 text-[10px] font-bold tracking-wide text-white',
  COMPLETED: 'rounded-md bg-green-500 px-2 py-1 text-[10px] font-bold tracking-wide text-white',
};

const previewClasses: Record<PreviewStyle, string> = {
  orange: 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500',
  paper: 'bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300',
  dark: 'bg-gradient-to-br from-zinc-700 via-zinc-800 to-black',
  beige: 'bg-gradient-to-br from-amber-100 via-stone-200 to-stone-300',
  navy: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900',
  slate: 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500',
};

export function CVCard({ id, title, status, lastEdited, rating, image, previewStyle = 'orange' }: CVCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const editUrl = NAV_PATH.APP.EDIT_CV.replace(':id', id);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => cvService.delete(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success('CV deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['cvs'] });
      } else {
        toast.error('Failed to delete CV');
      }
    },
    onError: () => {
      toast.error('An error occurred while deleting CV');
    },
    onSettled: () => {
      setIsDeleteDialogOpen(false);
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <article className='group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg'>
        <Link to={editUrl} className='block'>
          <div className={`relative h-56 w-full ${!image ? previewClasses[previewStyle] : ''}`}>
            {image && <img src={image} alt={title} className='h-full w-full object-cover' />}
            <div className='absolute top-4 left-4'>
              <span className={statusStyles[status]}>{status}</span>
            </div>

            <div className='absolute top-3 right-3 z-10 flex gap-2'>
              {/* Delete Button - Hover only */}
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-full bg-white/85 text-red-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-500'
                onClick={handleDelete}
                aria-label='Delete CV'>
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>

            {!image && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='h-[160px] w-[112px] rounded-sm bg-white shadow-xl'>
                  <div className='mx-auto mt-3 h-2 w-12 rounded bg-orange-400' />
                  <div className='mx-auto mt-3 h-1.5 w-20 rounded bg-slate-200' />
                  <div className='mx-auto mt-2 h-1.5 w-16 rounded bg-slate-200' />
                  <div className='mx-auto mt-5 h-1.5 w-20 rounded bg-slate-300' />
                  <div className='mx-auto mt-2 h-1.5 w-16 rounded bg-slate-200' />
                  <div className='mx-auto mt-2 h-1.5 w-[72px] rounded bg-slate-200' />
                  <div className='mx-auto mt-5 h-1.5 w-20 rounded bg-slate-300' />
                  <div className='mx-auto mt-2 h-1.5 w-16 rounded bg-slate-200' />
                  <div className='mx-auto mt-2 h-1.5 w-[72px] rounded bg-slate-200' />
                </div>
              </div>
            )}
          </div>

          <div className='flex min-h-[138px] flex-col p-4'>
            <h3 className='min-h-[56px] text-lg leading-7 font-semibold text-slate-900'>{title}</h3>

            <div className='mt-2 flex items-center gap-1 text-sm text-slate-500'>
              <Clock3 className='h-4 w-4' />
              <span>Last edited: {lastEdited}</span>
            </div>

            <div className='mt-auto flex items-center justify-between pt-4'>
              <div className='flex items-center gap-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={i < rating ? 'h-4 w-4 fill-orange-400 text-orange-400' : 'h-4 w-4 text-slate-300'} />
                ))}
              </div>

              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='z-10 h-8 w-8 rounded-full text-slate-500 hover:bg-orange-50 hover:text-orange-500'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                aria-label='Download CV'>
                <Download className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </Link>
      </article>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className='rounded-2xl sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Delete CV</DialogTitle>
            <DialogDescription className='py-2 text-slate-500'>
              Are you sure you want to delete <span className='font-semibold text-slate-900'>"{title}"</span>? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='mt-4 flex gap-2'>
            <DialogClose asChild>
              <Button variant='outline' className='border-border rounded-xl'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant='destructive'
              className='rounded-xl shadow-none'
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete CV'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export type { PreviewStyle };
