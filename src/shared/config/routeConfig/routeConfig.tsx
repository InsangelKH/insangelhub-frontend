import { ArticleCreatePage } from 'pages/ArticleCreatePage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleUpdatePage } from 'pages/ArticleUpdatePage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RegisterPage } from 'pages/RegisterPage';
import { ResumePage } from 'pages/ResumePage';
import { RouteProps } from 'react-router';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    RESUME = 'resume',
    LOGIN = 'login',
    PROFILE = 'profile',
    REGISTER = 'register',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_UPDATE = 'article_update',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESUME]: '/resume',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.PROFILE]: '/profile/',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/',
    [AppRoutes.ARTICLE_CREATE]: 'articles/create',
    [AppRoutes.ARTICLE_UPDATE]: 'articles/edit/',
    // last
    [AppRoutes.NOT_FOUND]: '*',

};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
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
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}:slug`,
        element: <ArticleDetailsPage />,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: RoutePath.article_create,
        element: <ArticleCreatePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_UPDATE]: {
        path: `${RoutePath.article_update}:slug`,
        element: <ArticleUpdatePage />,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
