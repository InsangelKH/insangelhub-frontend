import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { CreateArticle } from 'features/createArticle';
import cls from './ArticleCreatePage.module.scss';

interface ArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    return (
        <Page className={classNames(cls.ArticleCreatePage, {}, [className])}>
            <div className={cls.inputData}>
                <h1>{t('articles create')}</h1>
                <CreateArticle />
            </div>
        </Page>
    );
});

export default ArticleCreatePage;
