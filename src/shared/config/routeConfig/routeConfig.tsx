import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ResumePage } from 'pages/ResumePage';
import { RouteProps } from 'react-router';

export enum AppRoutes {
    MAIN = 'main',
    RESUME = 'resume',
    NOT_FOUND = 'not_found',
    LOGIN = 'login',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESUME]: '/resume',
    [AppRoutes.LOGIN]: 'login',
    // last
    [AppRoutes.NOT_FOUND]: '*',

};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.RESUME]: {
        path: RoutePath.resume,
        element: <ResumePage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
