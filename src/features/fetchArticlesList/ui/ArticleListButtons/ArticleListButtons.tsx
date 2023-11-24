import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { ArticleType } from 'entities/Article/model/types/article';
import { articlesListActions } from '../../model/slice/articlesListSlice';
import { getArticlesListSort, getArticlesListType } from '../../model/selectors/articlesListSelectors';
import { ArticleViewButton } from '../ArticleView/ArticleViewButton';
import cls from './ArticleListButtons.module.scss';
import { SortType } from '../../model/types/articlesList';

interface ArticleListButtonsProps {
    className?: string;
}

export const ArticleListButtons = memo((props: ArticleListButtonsProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    const dispatch = useAppDispatch();

    const sort = useSelector(getArticlesListSort);
    const articleType = useSelector(getArticlesListType);
    const defaultDropValue = t('Sort by');
    const dropDownOptions = [t('ASC'), t('DESC')];
    const handleSortChange = useCallback((value: string) => {
        dispatch(articlesListActions.setArticlesListSort(value as SortType));
    }, [dispatch]);

    const types: ArticleType[] = ['ALL', 'IT', 'ECONOMICS', 'LIFE'];
    const onTypeChange = useCallback((type: ArticleType) => {
        dispatch(articlesListActions.setArticlesListType(type));
    }, [dispatch]);

    return (
        <div className={classNames(cls.ArticleListButtons, {}, [className])}>
            <div className={cls.types}>
                {types.map((type) => (
                    <div
                        key={type}
                        className={classNames(cls.type, {
                            [cls.active]: type === articleType,
                        }, [])}
                        onClick={() => onTypeChange(type)}
                    >
                        {type}
                    </div>
                ))}
            </div>
            <div className={cls.sortView}>
                <Dropdown
                    className={classNames('', {}, [])}
                    defaultValue={sort || defaultDropValue}
                    options={dropDownOptions}
                    onChange={handleSortChange}
                />
                <ArticleViewButton className={cls.view} />
            </div>
        </div>
    );
});
