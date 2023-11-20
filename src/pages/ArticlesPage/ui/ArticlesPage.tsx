import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { ArticlesList } from 'features/fetchArticlesList';
import { ArticleViewButton } from 'features/fetchArticlesList/ui/ArticleView/ArticleViewButton';
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
            <ArticleViewButton />
            <ArticlesList />
        </Page>
    );
});

export default ArticlesPage;
