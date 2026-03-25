import { LayoutDashboard, FileText, FolderOpen, User, Settings, type LucideIcon } from 'lucide-react';
import { NAV_PATH } from '@/router/router.constant';

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const sidebarNavConfig: NavGroup[] = [
  {
    label: 'Main',
    items: [
      {
        title: 'Dashboard',
        path: NAV_PATH.DASHBOARD,
        icon: LayoutDashboard,
      },
      {
        title: 'My CVs',
        path: NAV_PATH.APP.MY_CVS,
        icon: FileText,
      },
      {
        title: 'Templates',
        path: NAV_PATH.APP.TEMPLATES,
        icon: FolderOpen,
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Profile',
        path: NAV_PATH.APP.PROFILE,
        icon: User,
      },
      {
        title: 'Settings',
        path: NAV_PATH.APP.SETTINGS,
        icon: Settings,
      },
    ],
  },
];
