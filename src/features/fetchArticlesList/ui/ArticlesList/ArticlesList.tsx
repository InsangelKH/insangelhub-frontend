import { TextBlock } from 'entities/Article/model/types/article';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import {
    getArticlesList,
    getArticlesListError,
    getArticlesListIsLoading,
    getArticlesListView,
} from '../../model/selectors/articlesListSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { articlesListReducer } from '../../model/slice/articlesListSlice';
import { ArticleView } from '../../model/types/articlesList';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { ArticleListButtons } from '../ArticleListButtons/ArticleListButtons';
import { ArticleListIsLoading } from '../ArticleListIsLoading/ArticleListIsLoading';
import { ArticlePageSwitcher } from '../ArticlePageSwitcher/ArticlePageSwitcher';
import { ArticleSearch } from '../ArticleSearch/ArticleSearch';
import { ArticlesNotFound } from '../ArticlesNotFound/ArticlesNotFound';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
    className?: string;
}

const initalReducers: ReducersList = {
    articlesList: articlesListReducer,
};

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();
    const article = useSelector(getArticlesList);
    const isLoading = useSelector(getArticlesListIsLoading);
    const error = useSelector(getArticlesListError);
    const view = useSelector(getArticlesListView);

    const viewClass = view === ArticleView.SMALL ? cls.SMALL : cls.BIG;

    useEffect(() => {
        dispatch(fetchArticlesList());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <ArticleListButtons />
            <ArticleSearch />
            <ArticlePageSwitcher />
            <div className={classNames(cls.ArticlesList, {}, [className, viewClass])}>
                {error && <ArticlesNotFound />}
                {!isLoading && article?.map((article) => (
                    <ArticleCard
                        key={article.id}
                        avatar={article.author.image}
                        author={article.author.username}
                        createdAt={article.createdAt}
                        title={article.title}
                        subtitle={article.subtitle}
                        image={article.image}
                        paragraphs={article.blocks
                            .filter((block): block is TextBlock => block.type === 'TEXT')
                            .map((block) => block.paragraphs.join(' '))}
                        types={article.type}
                        articleView={view}
                        slug={article.slug}
                    />
                ))}
                {isLoading && <ArticleListIsLoading view={view} />}
                {article?.length === 0 && (
                    <ArticlesNotFound />
                )}
            </div>
        </DynamicModuleLoader>
    );
});
