import { memo } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Burger } from 'shared/ui/Burger/Burger';
import { Icon } from 'shared/ui/Icon/Icon';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User/model/selectors/userSelectors';
import MainPageIcon from '../../../shared/assets/icons/icon-main-page.svg';
import ResumeIcon from '../../../shared/assets/icons/icon-resume.svg';
import ProfileIcon from '../../../shared/assets/icons/icon-profile.svg';
import ArticlesIcon from '../../../shared/assets/icons/icon-articles.svg';
import cls from './Footer.module.scss';

interface FooterProps {
    className?: string;
}

export const Footer = memo((props: FooterProps) => {
    const {
        className,
    } = props;

    const userData = useSelector(getUserData);

    return (
        <div className={classNames(cls.Footer, {}, [className])}>
            <AppLink to={RoutePath.main} className={cls.link}>
                <Icon Svg={MainPageIcon} className={cls.icon} />
            </AppLink>
            <AppLink to={RoutePath.resume} className={cls.link}>
                <Icon Svg={ResumeIcon} className={cls.icon} />
            </AppLink>
            {userData && (
                <AppLink to={`${RoutePath.profile}${userData.id}`} className={cls.appLink}>
                    <Icon Svg={ProfileIcon} className={cls.iconProfile} />
                </AppLink>
            )}
            <AppLink to={RoutePath.articles} className={cls.link}>
                <Icon Svg={ArticlesIcon} className={cls.iconArticles} />
            </AppLink>
            <Burger className={cls.burger} />
        </div>
    );
});
