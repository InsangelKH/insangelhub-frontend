import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article/model/types/article';
import { articlesListActions } from '../slice/articlesListSlice';
import { getArticlesListView } from '../selectors/articlesListSelectors';
import { ArticleView } from '../types/articlesList';

export const fetchArticlesList = createAsyncThunk<
    {articles: Article[], articlesCount: number},
    void,
    ThunkConfig<string>
>(
    'articlesListSlice/fetchArticlesList',
    async (authData, thunkApi) => {
        const {
            extra, dispatch, rejectWithValue, getState,
        } = thunkApi;

        const view = getArticlesListView(getState());
        const offset = 0;
        let limit:number;
        if (view === ArticleView.BIG) {
            limit = 4;
        } else {
            limit = 8;
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
