import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentSchema } from '../types/CommentSchema';
import { leaveArticleComment } from '../services/leaveArticleComment';
import { getCommentListAsync } from '../services/getCommentsListAsync';
import { deleteCommentById } from '../services/deleteCommentById';
import { updateCommentById } from '../services/updateCommentById';

const initialState: CommentSchema = {};

export const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
        setCommentList: (state, action: PayloadAction<Comment[]>) => {
            state.commentList = action.payload;
        },
        setCommentText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentListAsync.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getCommentListAsync.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getCommentListAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(leaveArticleComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteCommentById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateCommentById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: commentActions } = commentSlice;
export const { reducer: commentReducer } = commentSlice;
