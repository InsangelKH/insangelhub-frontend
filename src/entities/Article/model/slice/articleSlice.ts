import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article, ArticleSchema } from '../types/article';
import { getArticleBySlug } from '../services/getArticleBySlug';

const initialState: ArticleSchema = {};

export const articleSlice = createSlice({
    name: 'articleSlice',
    initialState,
    reducers: {
        setArticle: (state, action: PayloadAction<{ article: Article }>) => {
            state.article = { ...action.payload.article };
        },
        setIsDeleted: (state, action: PayloadAction<boolean>) => {
            state.isDeleted = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticleBySlug.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getArticleBySlug.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getArticleBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
