import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article } from 'entities/Article/model/types/article';
import { ArticlesListSchema } from '../types/articlesList';
import { fetchArticlesList } from '../services/fetchArticlesList';

const initialState: ArticlesListSchema = {};

export const articlesListSlice = createSlice({
    name: 'articlesListSlice',
    initialState,
    reducers: {
        setArticlesList: (state, action: PayloadAction<Article[]>) => {
            state.articlesList = action.payload;
        },
        setArticlesCount: (state, action: PayloadAction<number>) => {
            state.articlesCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlesListActions } = articlesListSlice;
export const { reducer: articlesListReducer } = articlesListSlice;
