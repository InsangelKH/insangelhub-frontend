import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { commentActions } from '../slice/commentSlice';

interface CommentRequestInterface {
    slug: string;
}

export const getCommentListAsync = createAsyncThunk<
    void,
    CommentRequestInterface,
    ThunkConfig<string>
>(
    'commentSlice/getCommentList',
    async (payload, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const { slug } = payload;

        try {
            const response = await extra.api.get(`/comment/${slug}`);

            if (!response.data) {
                throw new Error();
            }

            dispatch(commentActions.setCommentList(response.data));

            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
