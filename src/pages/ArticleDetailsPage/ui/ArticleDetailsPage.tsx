import { Article } from 'entities/Article/ui/Article/Article';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Comments } from 'entities/Comments';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;

    const { slug } = useParams<{slug: string}>();

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <Article slug={slug!} />
            <Comments slug={slug!} />
        </Page>
    );
});

export default ArticleDetailsPage;
