import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './LoginPage.module.scss';

interface ResumePageProps {
    className?: string;
}

const Login = memo((props: ResumePageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.LoginPage, {}, [className])}>
            <div className={cls.loginWrapper}>
                <h3>{t('type login')}</h3>
                <Input
                    className={cls.input}
                    required
                    type="email"
                />
                <h3>{t('type password')}</h3>
                <Input
                    className={cls.input}
                    required
                    type="password"
                />
                <Button className={cls.loginButton}>
                    {t('login')}
                </Button>
            </div>
        </Page>
    );
});

export default Login;
