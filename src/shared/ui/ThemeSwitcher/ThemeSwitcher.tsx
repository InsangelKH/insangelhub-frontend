import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import MoonIcon from '../../assets/icons-moon.svg';
import SunIcon from '../../assets/icons-sun.svg';
import { Icon } from '../Icon/Icon';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const {
        className,
    } = props;

    const { theme, toggleTheme } = useTheme();

    const onClick = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    const switchThemeFlag = theme === Theme.DARK;

    return (
        <div
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={onClick}
        >
            <div
                className={classNames(cls.switcherBtn, { [cls.clicked]: switchThemeFlag }, [className])}
            />
            <Icon Svg={SunIcon} className={cls.sun} />
            <Icon Svg={MoonIcon} className={cls.moon} />
        </div>
    );
});
