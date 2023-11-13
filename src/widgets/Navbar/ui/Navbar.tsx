import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import { LangSwithcer } from 'shared/ui/LangSwitcher/LangSwithcer';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <h2 className={cls.name}>{t('InsangelHub')}</h2>
            <h2 className={cls.nameMobile}>{t('IH')}</h2>
            <ThemeSwitcher />
            <LangSwithcer />
            <AppLink
                to={RoutePath.login}
                theme={AppLinkTheme.SECONDARY}
                className={cls.login}
            >
                <h2>{t('login')}</h2>
            </AppLink>
        </nav>
    );
});
