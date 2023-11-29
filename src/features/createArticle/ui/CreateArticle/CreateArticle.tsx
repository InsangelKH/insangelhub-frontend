import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import {
    getCreateArticleBlocks, getCreateArticleEmptyFieldError, getCreateArticleError, getCreateArticleFiles, getCreateArticleImage,
    getCreateArticleIsLoading,
    getCreateArticleResponse,
    getCreateArticleSubtitle,
    getCreateArticleTitle, getCreateArticleTypes,
} from '../../model/selectors/createArticleSelectors';
import { createArticleAsync } from '../../model/services/createArticleAsync';
import { createArticleActions, createArticleReducer } from '../../model/slice/createArticleSlice';
import { CreateArticleBlocks } from '../CreateArticleBlocks/CreateArticleBlocks';
import { CreateArticleImage } from '../CreateArticleImage/CreateArticleImage';
import { CreateArticleTitles } from '../CreateArticleTitles/CreateArticleTitles';
import { CreateArticleType } from '../CreateArticleTypes/CreateArticleType';
import cls from './CreateArticle.module.scss';

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

    const { t } = useTranslation('create-article');
    const dispatch = useAppDispatch();

    const title = useSelector(getCreateArticleTitle);
    const subtitle = useSelector(getCreateArticleSubtitle);
    const image = useSelector(getCreateArticleImage);
    const types = useSelector(getCreateArticleTypes);
    const blocks = useSelector(getCreateArticleBlocks);
    const files = useSelector(getCreateArticleFiles);
    const isLoading = useSelector(getCreateArticleIsLoading);
    const error = useSelector(getCreateArticleError);
    const emptyFieldError = useSelector(getCreateArticleEmptyFieldError);

    const onSendArticle = useCallback(() => {
        if (title && subtitle && types && blocks && files !== undefined) {
            dispatch(createArticleAsync({
                title, subtitle, image, types, blocks, files,
            }));
            dispatch(createArticleActions.setArticleEmptyFieldError(false));
        }
        if (
            title === '' || subtitle === '' || types?.length === 0 || blocks?.length === 0
        ) {
            dispatch(createArticleActions.setArticleEmptyFieldError(true));
        }
    }, [blocks, dispatch, files, image, subtitle, title, types]);

    const articleResponse = useSelector(getCreateArticleResponse);

    if (articleResponse) {
        return (
            <DynamicModuleLoader reducers={initialReducers}>
                <Navigate to={`${RoutePath.article_details}${articleResponse.slug}`} />
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
            <div className={classNames(cls.CreateArticle, {}, [className])}>
                {emptyFieldError && (
                    <h2 className={cls.emptyFieldError}>
                        {t('empty field error')}
                    </h2>
                )}
                <CreateArticleTitles />
                <CreateArticleType />
                <CreateArticleBlocks />
                <CreateArticleImage />
                <Button
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    onClick={onSendArticle}
                    disabled={isLoading}
                >
                    {t('send article')}

                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
