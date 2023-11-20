import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
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

    useEffect(() => {
        dispatch(fetchArticlesList());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <div className={classNames(cls.ArticlesList, {}, [className])}>
                <ArticleCard />
            </div>
        </DynamicModuleLoader>
    );
});
