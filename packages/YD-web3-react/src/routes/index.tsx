
import { RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import DappTest from '@/pages/DappTest';
import PageNotFoundView from "@components/common/PageNotFoundView";
import MainLayout from "@/layouts/MainLayout";

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
    { path: '/dapp', element: <DappTest /> },
  ],
};
Routes.push(mainRoutes);

export default Routes;
