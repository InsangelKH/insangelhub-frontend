import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RegisterPage } from 'pages/RegisterPage';
import { ResumePage } from 'pages/ResumePage';
import { RouteProps } from 'react-router';

export enum AppRoutes {
    MAIN = 'main',
    RESUME = 'resume',
    LOGIN = 'login',
    PROFILE = 'profile',
    REGISTER = 'register',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESUME]: '/resume',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.REGISTER]: '/register',
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
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
