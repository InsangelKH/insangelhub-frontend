import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slice/createArticleSlice';
import cls from './CreateArticle.module.scss';
import { CreateArticleTitles } from '../CreateArticleTitles/CreateArticleTitles';
import { CreateArticleType } from '../CreateArticleTypes/CreateArticleType';
import { CreateArticleBlocks } from '../CreateArticleBlocks/CreateArticleBlocks';

interface CreateArticleProps {
    className?: string;
}

const initialReducers: ReducersList = {
    createArticle: createArticleReducer,
};

export const CreateArticle = memo((props: CreateArticleProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation();

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.CreateArticle, {}, [className])}>
                <CreateArticleTitles />
                <CreateArticleType />
                <CreateArticleBlocks />
            </div>
        </DynamicModuleLoader>
    );
});
