import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { articlesListActions } from '../../model/slice/articlesListSlice';
import { getArticleListSort } from '../../model/selectors/articlesListSelectors';
import { ArticleViewButton } from '../ArticleView/ArticleViewButton';
import cls from './ArticleListButtons.module.scss';

interface ArticleListButtonsProps {
    className?: string;
}

export const ArticleListButtons = memo((props: ArticleListButtonsProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    const dispatch = useAppDispatch();

    const sort = useSelector(getArticleListSort);
    const defaultDropValue = t('Sort by');
    const dropDownOptions = [t('ASC'), t('DESC')];
    const handleSortChange = useCallback((value: string) => {
        dispatch(articlesListActions.setArticleListSort(value));
    }, [dispatch]);

    return (
        <div className={classNames(cls.ArticleListButtons, {}, [className])}>
            <ArticleViewButton className={cls.view} />
            <Dropdown
                className={classNames('', {}, [])}
                defaultValue={sort || defaultDropValue}
                options={dropDownOptions}
                onChange={handleSortChange}
            />
        </div>
    );
});
