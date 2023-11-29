import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button } from 'shared/ui/Button/Button';
import { getArticle, getArticleError, getArticleIsLoading } from '../../model/selectors/articleSelectors';
import { getArticleBySlug } from '../../model/services/getArticleBySlug';
import { articleReducer } from '../../model/slice/articleSlice';
import { ArticleTitle } from '../ArticleTitle/ArticleTitle';
import cls from './Article.module.scss';
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock';
import { ArticleIsLoading } from '../ArticleIsLoading/ArticleIsLoading';
import { ArticleError } from '../ArticleError/ArticleError';

interface ArticleProps {
    className?: string;
    slug: string;
}

const initalReducers: ReducersList = {
    article: articleReducer,
};

export const Article = memo((props: ArticleProps) => {
    const {
        className,
        slug,
    } = props;

    const { t } = useTranslation('articles');

    const dispatch = useAppDispatch();

    const article = useSelector(getArticle);
    const isLoading = useSelector(getArticleIsLoading);
    const error = useSelector(getArticleError);

    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    useEffect(() => {
        dispatch(getArticleBySlug({ slug }));
    }, [dispatch, slug]);

    if (isLoading) {
        return (
            <DynamicModuleLoader reducers={initalReducers}>
                <ArticleIsLoading />
            </DynamicModuleLoader>
        );
    }

    if (error) {
        return (
            <DynamicModuleLoader reducers={initalReducers}>
                <ArticleError />
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            {article && (
                <div className={classNames(cls.Article, {}, [className])}>
                    <div className={cls.header}>
                        <Button
                            className={cls.backBtn}
                            onClick={onBack}
                        >
                            {t('Back')}
                        </Button>
                        <div className={cls.types}>
                            {article?.type.map((type) => (
                                <div
                                    className={cls.type}
                                    key={type}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    </div>
                    <ArticleTitle article={article} />
                    {article?.blocks.map((block, index) => {
                        if (block.type === 'TEXT') {
                            return <ArticleTextBlock key={index} block={block} />;
                        } if (block.type === 'IMAGE') {
                            return <ArticleImageBlock key={index} block={block} />;
                        } if (block.type === 'CODE') {
                            return <ArticleCodeBlock key={index} block={block} />;
                        } return null;
                    })}
                </div>
            )}
        </DynamicModuleLoader>
    );
});
