import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from 'entities/Article/model/types/article';
import { getQueryParams } from 'shared/lib/addQueryParams/addQueryParams';
import { userActions } from 'entities/User';
import { articlesListActions } from '../slice/articlesListSlice';
import { getArticlesListView } from '../selectors/articlesListSelectors';
import { ArticleView, SortType } from '../types/articlesList';

export const fetchArticlesList = createAsyncThunk<
    {articles: Article[], articlesCount: number},
    void,
    ThunkConfig<string>
>(
    'articlesListSlice/fetchArticlesList',
    async (_, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue, getState,
        } = thunkApi;

        const view = getArticlesListView(getState());
        const sortBy = 'createdAt';
        const offset = 0;
        let limit:number;
        if (view === ArticleView.BIG) {
            limit = 4;
        } else {
            limit = 8;
        }

        const queryParams = getQueryParams();

        if (queryParams) {
            const viewValue = queryParams.get('view');
            const pageValue = queryParams.get('page');
            const offsetValue = queryParams.get('offset');
            const sortValue = queryParams.get('sort');
            const typeValue = queryParams.get('type');
            const searchValue = queryParams.get('search');

            try {
                const response = await extra.api.get('/articles', {
                    params: {
                        offset: offsetValue || offset,
                        limit,
                        sortBy,
                        sort: sortValue,
                        type: typeValue,
                        search: searchValue,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                if (viewValue !== null && (viewValue === ArticleView.SMALL || viewValue === ArticleView.BIG)) {
                    dispatch(articlesListActions.setArticleViewFromQuery(viewValue));
                }

                if (viewValue === null) {
                    dispatch(articlesListActions.setInitialArticleView());
                }

                if (pageValue !== null) {
                    const page = Number(pageValue);
                    dispatch(userActions.setArticlePage(page));
                } else {
                    dispatch(userActions.setArticlePage(1));
                }

                if (offsetValue !== null) {
                    const offset = Number(offsetValue);
                    dispatch(articlesListActions.setArticlesListOffset(offset));
                }

                if (sortValue !== null) {
                    dispatch(articlesListActions.setArticlesListSort(sortValue as SortType));
                }

                if (typeValue !== null) {
                    dispatch(articlesListActions.setArticlesListType(typeValue as ArticleType));
                }

                if (searchValue !== null) {
                    dispatch(articlesListActions.setArticlesListSearch(searchValue));
                }

                dispatch(articlesListActions.setArticlesList(response.data.articles));
                dispatch(articlesListActions.setArticlesCount(response.data.articlesCount));
                return response.data;
            } catch (e) {
                if (e instanceof Error) {
                    return rejectWithValue(e.message);
                }
                return rejectWithValue('Unknown error occurred');
            }
        }

        try {
            const response = await extra.api.get('/articles', {
                params: {
                    offset,
                    limit,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(articlesListActions.setInitialArticleView());
            dispatch(articlesListActions.setArticlesList(response.data.articles));
            dispatch(articlesListActions.setArticlesCount(response.data.articlesCount));
            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
