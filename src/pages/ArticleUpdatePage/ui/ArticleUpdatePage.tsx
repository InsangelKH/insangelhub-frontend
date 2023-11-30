import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { UpdateArticle } from 'features/updateArticle';
import cls from './ArticleUpdatePage.module.scss';

interface ArticleUpdatePageProps {
    className?: string;
}

const ArticleUpdatePage = memo((props: ArticleUpdatePageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    return (
        <Page className={classNames(cls.ArticleUpdatePage, {}, [className])}>
            <h1>{t('edit article')}</h1>
            <UpdateArticle />
        </Page>
    );
});

export default ArticleUpdatePage;
