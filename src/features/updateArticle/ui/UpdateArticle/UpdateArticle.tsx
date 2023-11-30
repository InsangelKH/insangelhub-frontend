import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import {
    getUpdateArticleBlocks, getUpdateArticleEmptyFieldError, getUpdateArticleError, getUpdateArticleFiles, getUpdateArticleImage, getUpdateArticleIsLoading, getUpdateArticleSubtitle, getUpdateArticleTitle, getUpdateArticleTypes,
    getUpdatedArticleData,
} from '../../model/selectors/updateArticleSelectors';
import { setUpdateArticleData } from '../../model/services/setUpdateArticleData';
import { updateArticleAsync } from '../../model/services/updateArticleAsync';
import { updateArticleActions, updateArticleReducer } from '../../model/slice/updateArticleSlice';
import { UpdateArticleBlocks } from '../UpdateArticleBlocks/UpdateArticleBlocks';
import { UpdateArticleImage } from '../UpdateArticleImage/UpdateArticleImage';
import { UpdateArticleTitles } from '../UpdateArticleTitles/UpdateArticleTitles';
import { UpdateArticleTypes } from '../UpdateArticleTypes/UpdateArticleTypes';
import cls from './UpdateArticle.module.scss';

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
    const isLoading = useSelector(getUpdateArticleIsLoading);
    const error = useSelector(getUpdateArticleError);
    const title = useSelector(getUpdateArticleTitle);
    const subtitle = useSelector(getUpdateArticleSubtitle);
    const types = useSelector(getUpdateArticleTypes);
    const blocks = useSelector(getUpdateArticleBlocks);
    const files = useSelector(getUpdateArticleFiles);
    const image = useSelector(getUpdateArticleImage);
    const updatedArticle = useSelector(getUpdatedArticleData);

    useEffect(() => {
        if (slug) {
            dispatch(setUpdateArticleData({ slug }));
        }
    }, [dispatch, slug]);

    const onSendArticle = useCallback(() => {
        if (
            title && subtitle && types && types?.length > 0
            && blocks && blocks.length > 0 && files !== undefined && slug
        ) {
            dispatch(updateArticleAsync({
                title, subtitle, image, types, blocks, files, slug,
            }));
            dispatch(updateArticleActions.setArticleEmptyFieldError(false));
        }
        if (
            title === '' || subtitle === '' || types?.length === 0 || blocks?.length === 0
        ) {
            dispatch(updateArticleActions.setArticleEmptyFieldError(true));
        }
    }, [blocks, dispatch, files, image, slug, subtitle, title, types]);

    if (updatedArticle) {
        return (
            <DynamicModuleLoader reducers={initialReducers}>
                <Navigate to={`${RoutePath.article_details}${updatedArticle.slug}`} />
            </DynamicModuleLoader>
        );
    }

    if (isLoading) {
        return (
            <DynamicModuleLoader reducers={initialReducers}>
                <PageLoader />
            </DynamicModuleLoader>
        );
    }

    if (error) {
        return (
            <h2 className={cls.errorMessage}>
                {t('create article error')}
            </h2>
        );
    }

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
                <Button
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    onClick={onSendArticle}
                    disabled={isLoading}
                >
                    {t('edit article')}

                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
