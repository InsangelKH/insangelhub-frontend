import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import { LangSwithcer } from 'shared/ui/LangSwitcher/LangSwithcer';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <h2>
                <AppLink
                    to={RoutePath.main}
                    className={cls.name}
                >
                    {t('InsangelHub')}
                </AppLink>
            </h2>
            <h2>
                <AppLink
                    to={RoutePath.main}
                    className={cls.nameMobile}
                >
                    {t('IH')}
                </AppLink>
            </h2>
            <ThemeSwitcher />
            <LangSwithcer />
            {!authData && (
                <AppLink
                    to={RoutePath.login}
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.login}
                >
                    <h3>{t('login_nav')}</h3>
                </AppLink>
            )}
            {authData && (
                <Button
                    className={cls.logoutBtn}
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onLogout}
                >
                    <h3>{t('logout')}</h3>
                </Button>
            )}
        </nav>
    );
});
