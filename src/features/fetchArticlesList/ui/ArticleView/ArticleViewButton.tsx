import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { articlesListActions } from '../../model/slice/articlesListSlice';
import BigIcon from '../../../../shared/assets/icons/icon-big.svg';
import SmallIcon from '../../../../shared/assets/icons/icon-small.svg';
import {
    getArticlesListOffset, getArticlesListSearch, getArticlesListSort, getArticlesListType, getArticlesListView,
} from '../../model/selectors/articlesListSelectors';
import cls from './ArticleViewButton.module.scss';
import { ArticleView } from '../../model/types/ArticlesListSchema';
import { sortArticlesList } from '../../model/services/sortArticlesList';

interface ArticleViewProps {
    className?: string;
}

export const ArticleViewButton = memo((props: ArticleViewProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const view = useSelector(getArticlesListView);
    const viewClass = view === ArticleView.SMALL ? cls.SMALL : cls.BIG;

    const search = useSelector(getArticlesListSearch);
    const sort = useSelector(getArticlesListSort);
    const offset = useSelector(getArticlesListOffset);
    const articleType = useSelector(getArticlesListType);
    const type = articleType === 'ALL' ? '' : articleType;

    const onChangeView = useCallback(() => {
        dispatch(articlesListActions.setArticlesView());
        const limit = view === ArticleView.SMALL ? 4 : 8;
        dispatch(sortArticlesList({
            sort, type, search, offset, limit,
        }));
    }, [dispatch, offset, search, sort, type, view]);

    return (
        <div
            className={classNames(cls.ArticleView, {}, [className, viewClass])}
            onClick={onChangeView}
        >
            <Icon Svg={SmallIcon} className={cls.icon} />
            <Icon Svg={BigIcon} className={cls.icon} />
        </div>
    );
});
