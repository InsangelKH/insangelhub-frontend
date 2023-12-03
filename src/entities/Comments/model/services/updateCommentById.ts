import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getCommentListAsync } from './getCommentsListAsync';

interface CommentRequestInterface {
    id: number;
    slug: string;
    text: string;
}

export const updateCommentById = createAsyncThunk<
    void,
    CommentRequestInterface,
    ThunkConfig<string>
>(
    'commentSlice/updateCommentById',
    async (payload, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const { id, slug, text } = payload;

        const body = {
            comment: {
                id,
                text,
            },
        };

        try {
            const response = await extra.api.put('/comment', body);

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
