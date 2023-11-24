import { userActions } from 'entities/User';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import IconSearch from '../../../../shared/assets/icons/icon-search.svg';
import {
    getArticlesListSearch, getArticlesListSort, getArticlesListType, getArticlesListView,
} from '../../model/selectors/articlesListSelectors';
import { sortArticlesList } from '../../model/services/sortArticlesList';
import { articlesListActions } from '../../model/slice/articlesListSlice';
import { ArticleView } from '../../model/types/articlesList';
import cls from './ArticleSearch.module.scss';

interface ArticleSearchProps {
    className?: string;
}

export const ArticleSearch = memo((props: ArticleSearchProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    const dispatch = useAppDispatch();
    const placeholder = t('search text');
    const search = useSelector(getArticlesListSearch);
    const sort = useSelector(getArticlesListSort);
    const articleType = useSelector(getArticlesListType);
    const view = useSelector(getArticlesListView);
    const type = articleType === 'ALL' ? '' : articleType;
    const limit = view === ArticleView.SMALL ? 8 : 4;

    const onChangeSearch = useCallback((value: string) => {
        dispatch(articlesListActions.setArticlesListSearch(value));
    }, [dispatch]);

    const onSearch = useCallback(() => {
        dispatch(userActions.setArticlePage(1));
        dispatch(articlesListActions.setArticlesListOffset(0));
        const offset = 0;
        dispatch(sortArticlesList({
            sort, type, search, offset, limit,
        }));
    }, [dispatch, limit, search, sort, type]);

    const onEnterPress = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    }, [onSearch]);

    return (
        <div
            className={classNames(cls.ArticleSearch, {}, [className])}
            onKeyDown={onEnterPress}
        >
            <Input
                className={cls.input}
                value={search || ''}
                theme={InputTheme.CLEAR}
                placeholder={placeholder}
                onChange={onChangeSearch}
            />
            <Button
                className={cls.button}
                theme={ButtonTheme.NONE}
                onClick={onSearch}
            >
                <Icon
                    Svg={IconSearch}
                    className={cls.icon}
                />
            </Button>
        </div>
    );
});
