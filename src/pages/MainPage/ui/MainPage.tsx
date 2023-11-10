import { ImageSlider } from 'features/ImageSlider/ui/ImageSlider';
import {
    memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './MainPage.module.scss';

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
            <h2 className={cls.title}>{t('welcome to insangelhub')}</h2>
            <h3 className={cls.reason}>{t('the reason of this app')}</h3>
            <div className={cls.list}>
                <h3>{t('you will find here')}</h3>
                <ul>
                    <li>{t('my resume')}</li>
                    <li>{t('my articles')}</li>
                    <li>{t('your articles')}</li>
                </ul>
            </div>
            <h3 className={cls.basedOn}>{t('app based on')}</h3>
            <ImageSlider />
        </Page>
    );
});

export default MainPage;
