import { ArticlesList } from 'features/fetchArticlesList';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo((props: ArticlesPageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <Page className={classNames(cls.ArticlesPage, {}, [className])}>
            <h2>{t('articles page')}</h2>
            <ArticlesList />
        </Page>
    );
});

export default ArticlesPage;
