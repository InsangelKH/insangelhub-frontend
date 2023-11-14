import { RegisterForm } from 'features/registerUser';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Navigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string;
}

const RegisterPage = memo((props: RegisterPageProps) => {
    const {
        className,
    } = props;

    const authData = useSelector(getUserAuthData);

    if (authData) {
        return <Navigate to={RoutePath.profile} />;
    }

    return (
        <Page className={classNames(cls.RegisterPage, {}, [className])}>
            <RegisterForm />
        </Page>
    );
});

export default RegisterPage;
