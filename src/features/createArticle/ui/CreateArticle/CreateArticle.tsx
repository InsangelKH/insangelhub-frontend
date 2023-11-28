import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
    getCreateArticleBlocks, getCreateArticleFiles, getCreateArticleImage,
    getCreateArticleSubtitle,
    getCreateArticleTitle, getCreateArticleTypes,
} from '../../model/selectors/createArticleSelectors';
import { createArticleAsync } from '../../model/services/createArticleAsync';
import { createArticleReducer } from '../../model/slice/createArticleSlice';
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

    const onSendArticle = useCallback(() => {
        if (title && subtitle && image && types && blocks && files !== undefined) {
            dispatch(createArticleAsync({
                title, subtitle, image, types, blocks, files,
            }));
        }
    }, [blocks, dispatch, files, image, subtitle, title, types]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.CreateArticle, {}, [className])}>
                <CreateArticleTitles />
                <CreateArticleType />
                <CreateArticleBlocks />
                <CreateArticleImage />
                <Button
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    onClick={onSendArticle}
                >
                    {t('send article')}

                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
