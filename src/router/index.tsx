import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { NAV_PATH } from './router.constant';

const LogicPage = lazy(() => import('@/pages/auth/LogicPage'));
const HomePage = lazy(() => import('@/pages/home'));

const publicRoute: RouteObject[] = [{ path: NAV_PATH.AUTH.LOGIN, element: <LogicPage /> }];

const privateRoute: RouteObject[] = [{ path: NAV_PATH.HOME, element: <HomePage /> }];

export const routes = [...privateRoute, ...publicRoute];
