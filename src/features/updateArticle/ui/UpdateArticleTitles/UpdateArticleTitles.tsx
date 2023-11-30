import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Input } from 'shared/ui/Input/Input';
import { getUpdateArticleSubtitle, getUpdateArticleTitle } from '../../model/selectors/updateArticleSelectors';
import { updateArticleActions } from '../../model/slice/updateArticleSlice';
import cls from './UpdateArticleTitles.module.scss';

interface UpdateArticleTitlesProps {
    className?: string;
}

export const UpdateArticleTitles = memo((props: UpdateArticleTitlesProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const dispatch = useAppDispatch();

    const title = useSelector(getUpdateArticleTitle);
    const titlePlaceHolder = t('place title');
    const subtitle = useSelector(getUpdateArticleSubtitle);
    const subtitlePlaceHolder = t('place subtitle');

    const onTitleChange = useCallback((value: string) => {
        dispatch(updateArticleActions.setArticleTitle(value));
    }, [dispatch]);

    const onSubtitleChange = useCallback((value: string) => {
        dispatch(updateArticleActions.setArticleSubtitle(value));
    }, [dispatch]);

    return (
        <div className={classNames(cls.UpdateArticleTitles, {}, [className])}>
            <div className={classNames(cls.updateInput, {}, [])}>
                <h2>{t('title')}</h2>
                <Input
                    value={title || ''}
                    placeholder={titlePlaceHolder}
                    onChange={onTitleChange}
                />
            </div>
            <div className={classNames(cls.updateInput, {}, [])}>
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
