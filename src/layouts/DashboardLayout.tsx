import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/components/app-sidebar';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className='flex h-15 shrink-0 items-center gap-2 border-b border-gray-300 bg-white px-4 shadow-md'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4 bg-gray-200' />
          <div className='flex-1' />
        </header>

        <main className='flex-1 overflow-auto'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
