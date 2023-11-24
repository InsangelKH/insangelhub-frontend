import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article/model/types/article';
import { articlesListActions } from '../slice/articlesListSlice';
import { SortType } from '../types/articlesList';

type ArticleTypeRequest = '' | 'IT' | 'ECONOMICS' | 'LIFE';

export const sortArticlesList = createAsyncThunk<
    {articles: Article[], articlesCount: number},
    {
        offset?: number;
        limit?: number;
        sortBy?: string,
        sort?: SortType,
        type?: ArticleTypeRequest,
        search?: string;
    },
    ThunkConfig<string>
>(
    'articlesListSlice/sortArticlesList',
    async (queryParams, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue,
        } = thunkApi;

        const sortBy = 'createdAt';

        try {
            const response = await extra.api.get('/articles', {
                params: {
                    offset: queryParams.offset,
                    limit: queryParams.limit,
                    sortBy,
                    sort: queryParams.sort,
                    type: queryParams.type,
                    search: queryParams.search,
                },
            });

            if (!response.data) {
                throw new Error();
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
    },
);
