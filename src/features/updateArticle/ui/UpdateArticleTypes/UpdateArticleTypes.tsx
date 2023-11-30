import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { ArticleType } from 'entities/Article/model/types/article';
import { getUpdateArticleTypes } from '../../model/selectors/updateArticleSelectors';
import { updateArticleActions } from '../../model/slice/updateArticleSlice';
import cls from './UpdateArticleTypes.module.scss';

interface UpdateArticleProps {
    className?: string;
}

export const UpdateArticleTypes = memo((props: UpdateArticleProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const dispatch = useAppDispatch();

    const stateTypes = useSelector(getUpdateArticleTypes);
    const types: ArticleType[] = ['IT', 'ECONOMICS', 'LIFE'];

    const onClickType = useCallback((type: ArticleType) => {
        dispatch(updateArticleActions.setArticleTypes(type));
    }, [dispatch]);

    return (
        <div className={classNames(cls.UpdateArticleTypes, {}, [className])}>
            <h2>{t('choose article type')}</h2>
            <div className={cls.types}>
                {types.map((type) => (
                    <div
                        className={classNames(cls.type, {
                            [cls.active]: stateTypes?.includes(type),
                        }, [])}
                        onClick={() => onClickType(type)}
                        key={type}
                    >
                        {type}
                    </div>
                ))}
            </div>
        </div>
    );
});
