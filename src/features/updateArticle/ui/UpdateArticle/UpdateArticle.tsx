import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { getUpdateArticleEmptyFieldError } from '../../model/selectors/updateArticleSelectors';
import { setUpdateArticleData } from '../../model/services/setUpdateArticleData';
import { updateArticleReducer } from '../../model/slice/updateArticleSlice';
import { UpdateArticleTitles } from '../UpdateArticleTitles/UpdateArticleTitles';
import cls from './UpdateArticle.module.scss';
import { UpdateArticleTypes } from '../UpdateArticleTypes/UpdateArticleTypes';
import { UpdateArticleBlocks } from '../UpdateArticleBlocks/UpdateArticleBlocks';
import { UpdateArticleImage } from '../UpdateArticleImage/UpdateArticleImage';

interface UpdateArticleProps {
    className?: string;
}

const initialReducers: ReducersList = {
    updateArticle: updateArticleReducer,
};

export const UpdateArticle = memo((props: UpdateArticleProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');
    const dispatch = useAppDispatch();
    const { slug } = useParams<{ slug: string }>();

    const emptyFieldError = useSelector(getUpdateArticleEmptyFieldError);

    useEffect(() => {
        if (slug) {
            dispatch(setUpdateArticleData({ slug }));
        }
    }, [dispatch, slug]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.UpdateArticle, {}, [className])}>
                {emptyFieldError && (
                    <h2 className={cls.emptyFieldError}>
                        {t('empty field error')}
                    </h2>
                )}
                <UpdateArticleTitles />
                <UpdateArticleTypes />
                <UpdateArticleBlocks />
                <UpdateArticleImage />
            </div>
        </DynamicModuleLoader>
    );
});
