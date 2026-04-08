import { Clock3, Download, MoreVertical, Star } from 'lucide-react';

type PreviewStyle = 'orange' | 'paper' | 'dark' | 'beige' | 'navy' | 'slate';

interface CVCardProps {
  title: string;
  status: 'DRAFT' | 'FINAL';
  lastEdited: string;
  rating: number;
  previewStyle?: PreviewStyle;
}

const previewClasses: Record<PreviewStyle, string> = {
  orange: 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500',
  paper: 'bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300',
  dark: 'bg-gradient-to-br from-zinc-700 via-zinc-800 to-black',
  beige: 'bg-gradient-to-br from-amber-100 via-stone-200 to-stone-300',
  navy: 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900',
  slate: 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500',
};

export function CVCard({
  title,
  status,
  lastEdited,
  rating,
  previewStyle = 'orange',
}: CVCardProps) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className={`relative h-56 w-full ${previewClasses[previewStyle]}`}>
        <div className="absolute left-4 top-4">
          <span
            className={
              status === 'DRAFT'
                ? 'rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wide text-orange-600'
                : 'rounded-md bg-orange-500 px-2 py-1 text-[10px] font-bold tracking-wide text-white'
            }
          >
            {status}
          </span>
        </div>

        <button
          type="button"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-slate-600 opacity-0 shadow-sm transition-opacity hover:bg-white group-hover:opacity-100"
          aria-label="More actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[160px] w-[112px] rounded-sm bg-white shadow-xl">
            <div className="mx-auto mt-3 h-2 w-12 rounded bg-orange-400" />
            <div className="mx-auto mt-3 h-1.5 w-20 rounded bg-slate-200" />
            <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-slate-200" />
            <div className="mx-auto mt-5 h-1.5 w-20 rounded bg-slate-300" />
            <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-slate-200" />
            <div className="mx-auto mt-2 h-1.5 w-[72px] rounded bg-slate-200" />
            <div className="mx-auto mt-5 h-1.5 w-20 rounded bg-slate-300" />
            <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-slate-200" />
            <div className="mx-auto mt-2 h-1.5 w-[72px] rounded bg-slate-200" />
          </div>
        </div>
      </div>

      <div className="flex min-h-[138px] flex-col p-4">
        <h3 className="min-h-[56px] text-lg font-semibold leading-7 text-slate-900">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <Clock3 className="h-4 w-4" />
          <span>Last edited: {lastEdited}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < rating
                    ? 'h-4 w-4 fill-orange-400 text-orange-400'
                    : 'h-4 w-4 text-slate-300'
                }
              />
            ))}
          </div>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-orange-50 hover:text-orange-500"
            aria-label="Download CV"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export type { PreviewStyle };