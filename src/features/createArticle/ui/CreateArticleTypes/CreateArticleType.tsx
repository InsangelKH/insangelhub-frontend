import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleType } from 'entities/Article/model/types/article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { getCreateArticleTypes } from '../../model/selectors/createArticleSelectors';
import { createArticleActions } from '../../model/slice/createArticleSlice';
import cls from './CreateArticleType.module.scss';

interface CreateArticleTypeProps {
    className?: string;
}

export const CreateArticleType = memo((props: CreateArticleTypeProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('create-article');

    const dispatch = useAppDispatch();

    const stateTypes = useSelector(getCreateArticleTypes);
    const types: ArticleType[] = ['IT', 'ECONOMICS', 'LIFE'];

    const onClickType = useCallback((type: ArticleType) => {
        dispatch(createArticleActions.setArticleTypes(type));
    }, [dispatch]);

    return (
        <div className={classNames(cls.CreateArticleType, {}, [className])}>
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
