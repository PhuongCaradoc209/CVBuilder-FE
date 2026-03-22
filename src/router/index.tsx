import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { NAV_PATH } from './router.constant';

const LoginPage = lazy(() => import('@/pages/auth/LogicPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const HomePage = lazy(() => import('@/pages/home'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

/**
 * Public routes
 */
const publicRoutes: RouteObject[] = [
  {
    path: NAV_PATH.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: NAV_PATH.AUTH.REGISTER,
    element: <RegisterPage />,
  },
];

/**
 * Private routes
 */
const privateRoutes: RouteObject[] = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: NAV_PATH.DASHBOARD,
        element: <HomePage />,
      },
      {
        path: NAV_PATH.APP.MY_CVS,
        element: <div className="text-gray-900">My CVs Page</div>,
      },
      {
        path: NAV_PATH.APP.TEMPLATES,
        element: <div className="text-gray-900">Templates Page</div>,
      },
      {
        path: NAV_PATH.APP.PROFILE,
        element: <div className="text-gray-900">Profile Page</div>,
      },
      {
        path: NAV_PATH.APP.SETTINGS,
        element: <div className="text-gray-900">Settings Page</div>,
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

export const routes: RouteObject[] = [...privateRoutes, ...publicRoutes, notFoundRoute];