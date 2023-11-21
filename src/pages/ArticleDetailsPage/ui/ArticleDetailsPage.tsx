import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { Article } from 'entities/Article/ui/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();
    const { slug } = useParams<{slug: string}>();

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <Article slug={slug!} />
        </Page>
    );
});

export default ArticleDetailsPage;
