import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-xl group-[.toaster]:rounded-2xl font-sans text-sm p-4',
          description: 'group-[.toast]:text-slate-500',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500',
          success: 'group-[.toast]:text-emerald-600',
          error: 'group-[.toast]:text-rose-600',
          warning: 'group-[.toast]:text-amber-600',
          info: 'group-[.toast]:text-sky-600',
        },
      }}
      icons={{
        success: <CircleCheckIcon className='size-5' />,
        info: <InfoIcon className='size-5' />,
        warning: <TriangleAlertIcon className='size-5' />,
        error: <OctagonXIcon className='size-5' />,
        loading: <Loader2Icon className='size-5 animate-spin' />,
      }}
      {...props}
    />
  );
};

export { Toaster };
