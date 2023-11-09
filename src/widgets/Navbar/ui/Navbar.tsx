import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import { LangSwithcer } from 'shared/ui/LangSwitcher/LangSwithcer';
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
            <ThemeSwitcher />
            <LangSwithcer />
        </nav>
    );
});
