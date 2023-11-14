import { LoginForm } from 'features/loginByUsername';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Navigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './LoginPage.module.scss';

interface ResumePageProps {
    className?: string;
}

const LoginPage = memo((props: ResumePageProps) => {
    const {
        className,
    } = props;

    const authData = useSelector(getUserAuthData);

    if (authData) {
        return <Navigate to={RoutePath.profile} />;
    }

    return (
        <Page className={classNames(cls.LoginPage, {}, [className])}>
            <LoginForm />
        </Page>
    );
});

export default LoginPage;
