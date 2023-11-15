import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { LoginForm } from 'features/loginByUsername';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './LoginPage.module.scss';

interface ResumePageProps {
    className?: string;
}

const LoginPage = memo((props: ResumePageProps) => {
    const {
        className,
    } = props;

    const userData = useSelector(getUserData);

    if (userData) {
        return <Navigate to={`${RoutePath.profile}${userData.id}`} />;
    }

    return (
        <Page className={classNames(cls.LoginPage, {}, [className])}>
            <LoginForm />
        </Page>
    );
});

export default LoginPage;
