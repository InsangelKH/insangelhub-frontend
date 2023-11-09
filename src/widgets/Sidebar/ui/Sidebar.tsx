import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Burger } from 'shared/ui/Burger/Burger';
import { Icon } from 'shared/ui/Icon/Icon';
import MainPageIcon from '../../../shared/assets/icon-main-page.svg';
import ResumeIcon from '../../../shared/assets/icon-resume.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    const [collapsed, setCollapsed] = useState(false);
    const [collapsing, setCollapsing] = useState(false);

    const onFold = useCallback(() => {
        setCollapsed((prev) => !prev);
        setCollapsing(true);
        setTimeout(() => {
            setCollapsing(false);
        }, 300);
    }, []);

    const mods = {
        [cls.collapsed]: collapsed,
        [cls.collapsing]: collapsing,
    };

    return (
        <aside className={classNames(cls.Sidebar, mods, [className])}>
            <Burger
                className={cls.foldWrapper}
                onClick={onFold}
            />
            <div className={classNames(cls.links, { [cls.collapsed]: collapsed }, [])}>
                <AppLink
                    to="*"
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.appLink}
                >
                    <Icon Svg={MainPageIcon} className={cls.icon} />
                    <p
                        className={classNames('', mods, [])}
                    >
                        {t('main')}
                    </p>
                </AppLink>
                <AppLink
                    to="*"
                    theme={AppLinkTheme.SECONDARY}
                    className={cls.appLink}
                >
                    <Icon Svg={ResumeIcon} className={cls.icon} />
                    <p
                        className={classNames('', mods, [])}
                    >
                        {t('resume')}
                    </p>
                </AppLink>
            </div>
        </aside>
    );
});
