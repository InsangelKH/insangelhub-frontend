import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
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
            MainPage
        </Page>
    );
});

export default MainPage;
