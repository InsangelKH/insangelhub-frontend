import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Icon } from 'shared/ui/Icon/Icon';
import { Burger } from 'shared/ui/Burger/Burger';
import cls from './Footer.module.scss';
import MainPageIcon from '../../../shared/assets/icons/icon-main-page.svg';
import ResumeIcon from '../../../shared/assets/icons/icon-resume.svg';

interface FooterProps {
    className?: string;
}

export const Footer = memo((props: FooterProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.Footer, {}, [className])}>
            <AppLink to={RoutePath.main} className={cls.link}>
                <Icon Svg={MainPageIcon} className={cls.icon} />
            </AppLink>
            <AppLink to={RoutePath.resume} className={cls.link}>
                <Icon Svg={ResumeIcon} className={cls.icon} />
            </AppLink>
            <Burger className={cls.burger} />
        </div>
    );
});
