import { TextBlock } from 'entities/Article/model/types/article';
import { getUserPage } from 'entities/User/model/selectors/userSelectors';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { getArticleListView, getArticlesList, getArticlesListIsLoading } from '../../model/selectors/articlesListSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { articlesListActions, articlesListReducer } from '../../model/slice/articlesListSlice';
import { ArticleView } from '../../model/types/articlesList';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import { ArticleListIsLoading } from '../ArticleListIsLoading/ArticleListIsLoading';
import { ArticlePageSwitcher } from '../ArticlePageSwitcher/ArticlePageSwitcher';
import { ArticleViewButton } from '../ArticleView/ArticleViewButton';
import cls from './ArticlesList.module.scss';
import { ArticleListError } from '../ArticleListError/ArticleListError';

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

    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const article = useSelector(getArticlesList);
    const isLoading = useSelector(getArticlesListIsLoading);
    const view = useSelector(getArticleListView);
    const page = useSelector(getUserPage);
    const limit = view === ArticleView.SMALL ? 8 : 4;
    let offset: number | undefined;

    if (page !== undefined) {
        offset = page === 1 ? 0 : ((page! - 1) * limit);
    }

    const viewClass = view === ArticleView.SMALL ? cls.SMALL : cls.BIG;

    useEffect(() => {
        if (typeof offset === 'number') {
            dispatch(fetchArticlesList({ offset, limit }));
            dispatch(articlesListActions.setInitialArticleView());
        }
    }, [dispatch, offset, limit, page]);

    if (isLoading) {
        return (
            <DynamicModuleLoader reducers={initalReducers}>
                <ArticleListIsLoading view={view} />
            </DynamicModuleLoader>
        );
    }

    if (article?.length === 0) {
        return (
            <DynamicModuleLoader reducers={initalReducers}>
                <ArticleListError />
            </DynamicModuleLoader>
        );
    }

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <ArticleViewButton />
            <ArticlePageSwitcher />
            <div className={classNames(cls.ArticlesList, {}, [className, viewClass])}>
                {article?.map((article) => (
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
            </div>
        </DynamicModuleLoader>
    );
});
