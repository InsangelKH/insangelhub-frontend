import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articleActions } from '../slice/articleSlice';

export interface FetchArticlePayload {
    slug: string;
}

export const getArticleBySlug = createAsyncThunk<
    void,
    FetchArticlePayload,
    ThunkConfig<string>
>(
    'articleSlice/getArticleBySlug',
    async (payload, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const { slug } = payload;

        try {
            const response = await extra.api.get(`/articles/${slug}`);

            if (!response.data) {
                throw new Error();
            }

            dispatch(articleActions.setArticle(response.data));

            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
