import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { TextBlock } from 'entities/Article/model/types/article';
import { ArticleView } from '../../model/types/articlesList';
import { getArticleListView, getArticlesList } from '../../model/selectors/articlesListSelectors';
import cls from './ArticlesList.module.scss';
import { articlesListReducer } from '../../model/slice/articlesListSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { ArticleCard } from '../ArticleCard/ArticleCard';

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
    const view = useSelector(getArticleListView);

    const viewClass = view === ArticleView.SMALL ? cls.SMALL : cls.BIG;

    useEffect(() => {
        dispatch(fetchArticlesList());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
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
                    />
                ))}
            </div>
        </DynamicModuleLoader>
    );
});
