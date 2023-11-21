import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { ArticleView } from '../../model/types/articlesList';
import { getArticleListPage, getArticleListView, getArticlesListCount } from '../../model/selectors/articlesListSelectors';
import { articlesListActions } from '../../model/slice/articlesListSlice';
import cls from './ArticlePageSwitcher.module.scss';

interface ArticlePagesProps {
    className?: string;
}

export const ArticlePageSwitcher = memo((props: ArticlePagesProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const view = useSelector(getArticleListView);
    const page = useSelector(getArticleListPage);
    const totalArticles = useSelector(getArticlesListCount);
    const limit = view === ArticleView.SMALL ? 8 : 3;
    const pageCount = Math.ceil(totalArticles! / limit);
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);

    const onChangePage = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const page = Number(event.currentTarget.innerText);
        dispatch(articlesListActions.setArticlePage(page));
    }, [dispatch]);

    return (
        <div
            className={classNames(cls.ArticlePageSwitcher, {}, [className])}
        >
            {pageNumbers.map((pageNumber) => (
                <div
                    key={pageNumber}
                    className={classNames(cls.number, {
                        [cls.active]: pageNumber === page,
                    }, [className])}
                    onClick={onChangePage}
                >
                    {pageNumber}
                </div>
            ))}
        </div>
    );
});
