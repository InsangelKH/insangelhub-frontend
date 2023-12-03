import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getCommentListAsync } from './getCommentsListAsync';

interface CommentRequestInterface {
    id: number;
    slug: string;
}

export const deleteCommentById = createAsyncThunk<
    void,
    CommentRequestInterface,
    ThunkConfig<string>
>(
    'commentSlice/deleteCommentById',
    async (payload, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const { id, slug } = payload;

        try {
            const response = await extra.api.delete('/comment', {
                data: {
                    comment: {
                        id,
                    },
                },
            });

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
