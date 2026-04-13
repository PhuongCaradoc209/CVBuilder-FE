import { CVCard, type PreviewStyle } from './cv-card';

export interface CV {
  id: string;
  title: string;
  status: 'DRAFT' | 'FINAL';
  lastEdited: string;
  rating: number;
  tag: 'work' | 'freelance' | 'personal';
  template: 'modern' | 'classic' | 'creative';
  updatedAtOrder: number;
  previewStyle?: PreviewStyle;
}

interface CVGridProps {
  cvs: CV[];
}

export function CVGrid({ cvs }: CVGridProps) {
  if (!cvs.length) {
    return (
      <div className='rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm'>
        <h3 className='text-lg font-semibold text-slate-900'>No CVs found</h3>
        <p className='mt-2 text-sm text-slate-500'>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
      {cvs.map((cv) => (
        <CVCard
          key={cv.id}
          title={cv.title}
          status={cv.status}
          lastEdited={cv.lastEdited}
          rating={cv.rating}
          previewStyle={cv.previewStyle}
        />
      ))}
    </div>
  );
}
