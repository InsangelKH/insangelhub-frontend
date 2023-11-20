import { createSlice } from '@reduxjs/toolkit';
import { ArticleSchema } from '../types/article';

const initialState: ArticleSchema = {};

export const articleSlice = createSlice({
    name: 'articleSlice',
    initialState,
    reducers: {},
    //  extraReducers: (builder) => {
    //  builder
    //  .addCase('articleSlice'.pending, (state, action) => {
    //     state.error = undefined;
    //     state.isLoading = true;
    //  })
    //  .addCase('articleSlice'.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //  })
    //  .addCase('articleSlice'.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //  })
    //  },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
