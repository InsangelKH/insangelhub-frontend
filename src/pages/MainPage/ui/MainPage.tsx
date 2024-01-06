import { ImageSlider } from 'features/ImageSlider/ui/ImageSlider';
import {
    memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './MainPage.module.scss';
import ProfileIcon from '../../../shared/assets/icons/icon-profile.svg';
import ResumeIcon from '../../../shared/assets/icons/icon-resume.svg';
import ArticlesIcon from '../../../shared/assets/icons/icon-articles.svg';
import ArticleCreateIcon from '../../../shared/assets/icons/icon-create-article.svg';

interface MainPageProps {
    className?: string;
}

const MainPage = memo((props: MainPageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <Page className={classNames(cls.MainPage, {}, [className])}>
            <p className={cls.welcomeMessage}>{t('welcome to insangelhub')}</p>
            <p className={cls.title}>
                {t('welcome message')}
            </p>
            <div
                className={cls.aboutMeText}
            >
                <h3>{t('about myself')}</h3>
                <p
                    className={cls.bio}
                >
                    {t('bio')}
                </p>
            </div>
            <div
                className={cls.aboutAppField}
            >
                <p className={cls.title}>
                    {t('about app')}
                </p>
                <p className={cls.basedOn}>
                    {t('app based on')}
                    {t('github info')}
                </p>
                <p className={cls.title}>{t('WARNINGNOIMAGES')}</p>
                <p>
                    {t('Frontend part')}
                    <AppLink
                        to="https://github.com/InsangelKH/insangelhub-frontend/tree/master"
                        className={cls.link}
                    >
                        {t('FrontHub')}
                    </AppLink>
                </p>
                <p>
                    {t('Backend part')}
                    <AppLink
                        to="https://github.com/InsangelKH/insangelhub-backend"
                        className={cls.link}
                    >
                        {t('BackHub')}
                    </AppLink>
                </p>
                <p>
                    {t('register link')}
                    <AppLink
                        to={RoutePath.register}
                        className={cls.linkIsnide}
                    >
                        {t('link for registration')}
                    </AppLink>
                    {t('extra register info')}
                </p>
                <p>
                    {t('dont wanna register')}
                    <strong>{t('Guest@gmail.com, ')}</strong>
                    {t('password guest')}
                    <strong>{t('123')}</strong>
                </p>
                <p>
                    {t('after login')}
                    <Icon
                        Svg={ProfileIcon}
                        className={cls.icon}
                    />
                    {t('not able get profile page')}
                </p>
                <p>
                    {t('change theme language')}
                </p>
                <p>
                    {t('resume words')}
                    <AppLink
                        to={RoutePath.resume}
                        className={cls.linkIsnide}
                    >
                        {t('link for resume')}
                    </AppLink>
                    {t('with icon next resume')}
                    <Icon
                        Svg={ResumeIcon}
                        className={cls.icon}
                    />
                    {t('in sidbar resume')}
                </p>
                <p>
                    {t('look article')}
                    <AppLink
                        to={RoutePath.articles}
                        className={cls.linkIsnide}
                    >
                        {t('link for resume')}
                    </AppLink>
                    {t('looks like icon article')}
                    <Icon
                        Svg={ArticlesIcon}
                        className={cls.iconArticle}
                    />
                    {t('and choose article to read')}
                </p>
                <p>
                    {t('furthermore create article')}
                    <AppLink
                        to={RoutePath.article_create}
                        className={cls.linkIsnide}
                    >
                        {t('link for resume')}
                    </AppLink>
                    {t('looks like icon article')}
                    <Icon
                        Svg={ArticleCreateIcon}
                        className={cls.iconCreate}
                    />
                    {t('delete or edit article')}
                </p>
                <ImageSlider />
            </div>
        </Page>
    );
});

export default MainPage;
