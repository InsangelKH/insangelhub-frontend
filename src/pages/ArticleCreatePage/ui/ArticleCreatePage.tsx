import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticleCreatePage.module.scss';

interface ArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <Page className={classNames(cls.ArticleCreatePage, {}, [className])}>
            <h2>{t('articles create')}</h2>
        </Page>
    );
});

export default ArticleCreatePage;
