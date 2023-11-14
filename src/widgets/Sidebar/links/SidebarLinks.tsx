import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Icon } from 'shared/ui/Icon/Icon';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './SidebarLinks.module.scss';
import MainPageIcon from '../../../shared/assets/icons/icon-main-page.svg';
import ResumeIcon from '../../../shared/assets/icons/icon-resume.svg';
import ProfileIcon from '../../../shared/assets/icons/icon-profile.svg';

interface SidebarLinksProps {
    className?: string;
    collapsed: boolean;
    collapsing: boolean;
}

export const SidebarLinks = memo((props: SidebarLinksProps) => {
    const {
        className,
        collapsed,
        collapsing,
    } = props;

    const { t } = useTranslation();
    const mods = {
        [cls.collapsed]: collapsed,
        [cls.collapsing]: collapsing,
    };

    return (
        <div className={classNames(cls.SidebarLinks, {}, [className])}>
            <AppLink
                to={RoutePath.main}
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
                to={RoutePath.resume}
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
            <AppLink
                to={RoutePath.profile}
                theme={AppLinkTheme.SECONDARY}
                className={cls.appLink}
            >
                <Icon Svg={ProfileIcon} className={cls.iconProfile} />
                <p
                    className={classNames('', mods, [])}
                >
                    {t('profile')}
                </p>
            </AppLink>
        </div>
    );
});
