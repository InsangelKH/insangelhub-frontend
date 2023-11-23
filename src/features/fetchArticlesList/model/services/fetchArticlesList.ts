import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article/model/types/article';
import { articlesListActions } from '../slice/articlesListSlice';

export const fetchArticlesList = createAsyncThunk<
    {articles: Article[], articlesCount: number},
    {
        offset: number,
        limit: number,
        sortBy?: string,
        sort?: string,
    },
    ThunkConfig<string>
>(
    'articlesListSlice/fetchArticlesList',
    async (authData, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue,
        } = thunkApi;

        const sortBy = 'createdAt';

        try {
            const response = await extra.api.get('/articles', {
                params: {
                    offset: authData.offset,
                    limit: authData.limit,
                    sortBy,
                    sort: authData.sort,
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
