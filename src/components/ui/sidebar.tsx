import { PanelLeft } from 'lucide-react';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SidebarContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}

function SidebarProvider({
  children,
  defaultOpen = true,
}: React.PropsWithChildren<{ defaultOpen?: boolean }>) {
  const [open, setOpen] = React.useState(defaultOpen);

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>;
}

function Sidebar({ className, children, ...props }: React.ComponentProps<'aside'>) {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <div
        className={cn('fixed inset-0 z-40 bg-black/40 md:hidden', open ? 'block' : 'hidden')}
        onClick={() => setOpen(false)}
      />

      <aside
        data-slot='sidebar'
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 md:static md:z-auto md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex min-h-screen min-w-0 flex-1 flex-col', className)} {...props} />;
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<'button'>) {
  const { open, setOpen } = useSidebar();

  return (
    <button
      type='button'
      data-slot='sidebar-trigger'
      aria-label='Toggle Sidebar'
      onClick={() => setOpen(!open)}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      {...props}
    >
      <PanelLeft className='size-4' />
    </button>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2 p-4', className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mt-auto p-4', className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-1 flex-col gap-4 overflow-y-auto p-2', className)} {...props} />;
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase', className)}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1', className)} {...props} />;
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul className={cn('flex flex-col gap-1', className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('list-none', className)} {...props} />;
}

type SidebarMenuButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
};

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='sidebar-menu-button'
      data-active={isActive}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_svg]:size-4',
        isActive && 'bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-600',
        className,
      )}
      {...props}
    />
  );
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mx-4 border-t border-sidebar-border', className)} {...props} />;
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
};