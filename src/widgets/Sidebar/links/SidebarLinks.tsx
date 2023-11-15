import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Icon } from 'shared/ui/Icon/Icon';
import MainPageIcon from '../../../shared/assets/icons/icon-main-page.svg';
import ProfileIcon from '../../../shared/assets/icons/icon-profile.svg';
import ResumeIcon from '../../../shared/assets/icons/icon-resume.svg';
import cls from './SidebarLinks.module.scss';

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

    const userData = useSelector(getUserData);

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
            {userData && (
                <AppLink
                    to={`${RoutePath.profile}${userData.id}`}
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
            )}
        </div>
    );
});
