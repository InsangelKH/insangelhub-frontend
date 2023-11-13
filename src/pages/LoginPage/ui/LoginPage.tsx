import { LoginForm } from 'features/loginByUsername';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './LoginPage.module.scss';

interface ResumePageProps {
    className?: string;
}

const Login = memo((props: ResumePageProps) => {
    const {
        className,
    } = props;

    return (
        <Page className={classNames(cls.LoginPage, {}, [className])}>
            <LoginForm />
        </Page>
    );
});

export default Login;
