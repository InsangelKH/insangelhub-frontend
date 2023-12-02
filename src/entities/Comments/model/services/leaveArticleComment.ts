import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getCommentListAsync } from './getCommentsListAsync';

export interface CommentRequestInterface {
    slug: string;
    text: string;
}

export const leaveArticleComment = createAsyncThunk<
    void,
    CommentRequestInterface,
    ThunkConfig<string>
>(
    'commentSlice/leaveArticleComment',
    async (payload, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const { slug, text } = payload;

        const body = {
            comment: {
                text,
            },
        };

        try {
            const response = await extra.api.post(`/comment/${slug}`, body);

            if (!response.data) {
                throw new Error();
            }

            dispatch(getCommentListAsync({ slug }));

            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
