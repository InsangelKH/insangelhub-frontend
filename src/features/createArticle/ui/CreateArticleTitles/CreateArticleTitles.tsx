import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Input } from 'shared/ui/Input/Input';
import { getCreateArticleSubtitle, getCreateArticleTitle } from '../../model/selectors/createArticleSelectors';
import { createArticleActions } from '../../model/slice/createArticleSlice';
import cls from './CreateArticleTitles.module.scss';

interface CreateArticleProps {
    className?: string;
}

export const CreateArticleTitles = memo((props: CreateArticleProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const dispatch = useAppDispatch();

    const title = useSelector(getCreateArticleTitle);
    const titlePlaceHolder = t('place title');
    const subtitle = useSelector(getCreateArticleSubtitle);
    const subtitlePlaceHolder = t('place subtitle');

    const onTitleChange = useCallback((value: string) => {
        dispatch(createArticleActions.setArticleTitle(value));
    }, [dispatch]);

    const onSubtitleChange = useCallback((value: string) => {
        dispatch(createArticleActions.setArticleSubtitle(value));
    }, [dispatch]);

    return (
        <div className={classNames(cls.CreateArticleTitles, {}, [className])}>
            <div className={classNames(cls.createInput, {}, [])}>
                <h2>{t('title')}</h2>
                <Input
                    value={title || ''}
                    placeholder={titlePlaceHolder}
                    onChange={onTitleChange}
                />
            </div>
            <div className={classNames(cls.createInput, {}, [])}>
                <h2>{t('subtitle')}</h2>
                <Input
                    value={subtitle || ''}
                    placeholder={subtitlePlaceHolder}
                    onChange={onSubtitleChange}
                />
            </div>
        </div>
    );
});
