import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articleActions } from '../slice/articleSlice';

export interface FetchArticlePayload {
    slug: string;
}

export const deleteArticleBySlug = createAsyncThunk<
    void,
    FetchArticlePayload,
    ThunkConfig<string>
>(
    'articleSlice/deleteArticleBySlug',
    async (payload, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const { slug } = payload;

        try {
            const response = await extra.api.delete(`/articles/${slug}`);

            if (!response.data) {
                throw new Error();
            }

            dispatch(articleActions.setIsDeleted(true));

            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
