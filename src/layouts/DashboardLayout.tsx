import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { AppSidebar } from '@/components/app-sidebar';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className='flex h-14 shrink-0 items-center gap-2 border-b bg-white px-4'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='bg-gray-200 mr-2 h-4' />
          <div className='flex-1' />
        </header>

        <main className='flex-1 overflow-auto bg-gray-50 p-6'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}