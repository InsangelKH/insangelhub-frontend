import { userActions } from 'entities/User';
import { getUserPage } from 'entities/User/model/selectors/userSelectors';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import {
    getArticlesListCount, getArticlesListSearch, getArticlesListSort, getArticlesListType, getArticlesListView,
} from '../../model/selectors/articlesListSelectors';
import { sortArticlesList } from '../../model/services/sortArticlesList';
import { ArticleView } from '../../model/types/ArticlesListSchema';
import cls from './ArticlePageSwitcher.module.scss';
import { articlesListActions } from '../../model/slice/articlesListSlice';

interface ArticlePagesProps {
    className?: string;
}

export const ArticlePageSwitcher = memo((props: ArticlePagesProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const view = useSelector(getArticlesListView);
    const userPage = useSelector(getUserPage);
    const totalArticles = useSelector(getArticlesListCount);
    const search = useSelector(getArticlesListSearch);
    const sort = useSelector(getArticlesListSort);
    const articleType = useSelector(getArticlesListType);
    const type = articleType === 'ALL' ? '' : articleType;
    const limit = view === ArticleView.SMALL ? 8 : 4;
    const pageCount = Math.ceil(totalArticles! / limit);
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

    const onChangePage = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const page = Number(event.currentTarget.innerText);
        dispatch(userActions.setArticlePage(page));
        const offset = page === 1 ? 0 : ((page - 1) * limit);
        dispatch(articlesListActions.setArticlesListOffset(offset));
        dispatch(sortArticlesList({
            offset, limit, search, type, sort,
        }));
    }, [dispatch, limit, search, sort, type]);

    return (
        <div
            className={classNames(cls.ArticlePageSwitcher, {}, [className])}
        >
            {pageNumbers.map((pageNumber) => (
                <div
                    key={pageNumber}
                    className={classNames(cls.number, {
                        [cls.active]: pageNumber === userPage,
                    }, [className])}
                    onClick={onChangePage}
                >
                    {pageNumber}
                </div>
            ))}
        </div>
    );
});
