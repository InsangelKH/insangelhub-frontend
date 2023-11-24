import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { ArticleType } from 'entities/Article/model/types/article';
import { articlesListActions } from '../../model/slice/articlesListSlice';
import {
    getArticlesListOffset, getArticlesListSearch, getArticlesListSort, getArticlesListType, getArticlesListView,
} from '../../model/selectors/articlesListSelectors';
import { ArticleViewButton } from '../ArticleView/ArticleViewButton';
import cls from './ArticleListButtons.module.scss';
import { ArticleView, SortType } from '../../model/types/articlesList';
import { sortArticlesList } from '../../model/services/sortArticlesList';

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
    const view = useSelector(getArticlesListView);
    const offset = useSelector(getArticlesListOffset);
    const limit = view === ArticleView.SMALL ? 8 : 4;
    const search = useSelector(getArticlesListSearch);

    const defaultDropValue = t('Sort by');
    const dropDownOptions = [t('ASC'), t('DESC')];
    const handleSortChange = useCallback((value: string) => {
        dispatch(articlesListActions.setArticlesListSort(value as SortType));
        const type = articleType === 'ALL' ? '' : articleType;
        dispatch(sortArticlesList({
            sort: value as SortType, type, search, offset, limit,
        }));
    }, [dispatch, limit, offset, search, articleType]);

    const types: ArticleType[] = ['ALL', 'IT', 'ECONOMICS', 'LIFE'];
    const onTypeChange = useCallback((articleType: ArticleType) => {
        dispatch(articlesListActions.setArticlesListType(articleType));
        const type = articleType === 'ALL' ? '' : articleType;
        dispatch(sortArticlesList({
            sort, type, search, offset, limit,
        }));
    }, [dispatch, limit, offset, search, sort]);

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
