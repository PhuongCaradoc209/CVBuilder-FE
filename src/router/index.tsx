import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { NAV_PATH } from './router.constant';

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const LoginSuccessPage = lazy(() => import('@/pages/auth/LoginSuccessPage'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

const DashboardPage = lazy(() => import('@/pages/dashboard'));
const ProfilePage = lazy(() => import('@/pages/profile'));
const MyCvsPage = lazy(() => import('@/pages/my-cvs'));
const CreateCvPage = lazy(() => import('@/pages/create-cv'));
const TemplatesPage = lazy(() => import('@/pages/templates'));

/**
 * Auth routes
 */
const authRoutes: RouteObject[] = [
  {
    path: NAV_PATH.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: NAV_PATH.AUTH.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: NAV_PATH.AUTH.LOGIN_SUCCESS,
    element: <LoginSuccessPage />,
  },
];

/**
 * App routes
 */
const appRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: NAV_PATH.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: NAV_PATH.APP.MY_CVS,
        element: <MyCvsPage />,
      },
      {
        path: NAV_PATH.APP.CREATE_CV,
        element: <CreateCvPage />,
      },
      {
        path: NAV_PATH.APP.TEMPLATES,
        element: <TemplatesPage />,
      },
      {
        path: NAV_PATH.APP.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: NAV_PATH.APP.SETTINGS,
        element: <div className='text-slate-900'>Settings Page</div>,
      },
    ],
  },
];

/**
 * 404 route
 */
const notFoundRoute: RouteObject = {
  path: '*',
  element: <NotFoundPage />,
};

export const routes: RouteObject[] = [...appRoutes, ...authRoutes, notFoundRoute];
