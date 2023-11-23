import { TextBlock } from 'entities/Article/model/types/article';
import { getUserPage } from 'entities/User/model/selectors/userSelectors';
import {
    memo,
    useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import {
    getArticleListSort, getArticleListView, getArticlesList, getArticlesListIsLoading,
} from '../../model/selectors/articlesListSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { articlesListActions, articlesListReducer } from '../../model/slice/articlesListSlice';
import { ArticleView } from '../../model/types/articlesList';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { ArticleListError } from '../ArticleListError/ArticleListError';
import { ArticleListIsLoading } from '../ArticleListIsLoading/ArticleListIsLoading';
import { ArticlePageSwitcher } from '../ArticlePageSwitcher/ArticlePageSwitcher';
import cls from './ArticlesList.module.scss';
import { ArticleListButtons } from '../ArticleListButtons/ArticleListButtons';

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
    const view = useSelector(getArticleListView);
    const page = useSelector(getUserPage);
    const sort = useSelector(getArticleListSort);
    const limit = view === ArticleView.SMALL ? 8 : 4;
    let offset: number | undefined;

    if (page !== undefined) {
        offset = page === 1 ? 0 : ((page - 1) * limit);
    }

    const viewClass = view === ArticleView.SMALL ? cls.SMALL : cls.BIG;

    useEffect(() => {
        if (typeof offset === 'number') {
            dispatch(fetchArticlesList({ offset, limit, sort }));
            dispatch(articlesListActions.setInitialArticleView());
        }
    }, [dispatch, offset, limit, page, sort]);

    if (article?.length === 0) {
        return (
            <DynamicModuleLoader reducers={initalReducers}>
                <ArticleListError />
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <ArticleListButtons />
            <ArticlePageSwitcher />
            <div className={classNames(cls.ArticlesList, {}, [className, viewClass])}>
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
            </div>
        </DynamicModuleLoader>
    );
});
