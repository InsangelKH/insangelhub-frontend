import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { RegisterForm } from 'features/registerUser';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string;
}

const RegisterPage = memo((props: RegisterPageProps) => {
    const {
        className,
    } = props;

    const userData = useSelector(getUserData);

    if (userData) {
        return <Navigate to={`${RoutePath.profile}${userData.id}`} />;
    }

    return (
        <Page className={classNames(cls.RegisterPage, {}, [className])}>
            <RegisterForm />
        </Page>
    );
});

export default RegisterPage;
