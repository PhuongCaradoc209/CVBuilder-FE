import { FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { sidebarNavConfig } from '@/config/sidebar-nav';
import { NAV_PATH } from '@/router/router.constant';

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to={NAV_PATH.DASHBOARD} className='flex items-center gap-2 px-2 py-1.5'>
          <div className='flex h-8 w-8 items-center justify-center rounded-md bg-orange-500'>
            <FileText className='h-4 w-4 text-white' />
          </div>

          <span className='text-lg font-semibold text-gray-900'>CV Builder Pro</span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {sidebarNavConfig.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.path === NAV_PATH.DASHBOARD
                      ? location.pathname === NAV_PATH.DASHBOARD
                      : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link to={item.path}>
                          <item.icon className={isActive ? 'text-orange-500' : ''} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className='px-2 py-1.5 text-xs text-gray-400'>&copy; {new Date().getFullYear()} CV Builder Pro</div>
      </SidebarFooter>
    </Sidebar>
  );
}