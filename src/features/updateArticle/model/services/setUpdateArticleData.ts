import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { updateArticleActions } from '../slice/updateArticleSlice';

export interface FetchArticlePayload {
    slug: string;
}

export const setUpdateArticleData = createAsyncThunk<
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

            dispatch(updateArticleActions.setArticleResponse(response.data));
            dispatch(updateArticleActions.setArticleTitle(response.data.article.title));
            dispatch(updateArticleActions.setArticleSubtitle(response.data.article.subtitle));
            dispatch(updateArticleActions.setInitialTypes(response.data.article.type));
            dispatch(updateArticleActions.setInitialBlocks(response.data.article.blocks));
            dispatch(updateArticleActions.setInitialArticleImage(response.data.article.image));

            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
