import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article, ArticleType } from 'entities/Article/model/types/article';
import { VIEW_LOCAL_STORAGE_KEY } from 'shared/consts/localstorage';
import { ArticleView, ArticlesListSchema, SortType } from '../types/articlesList';
import { fetchArticlesList } from '../services/fetchArticlesList';

const initialState: ArticlesListSchema = {
    type: 'ALL',
};

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
        setInitialArticleView: (state) => {
            state.view = localStorage.getItem(VIEW_LOCAL_STORAGE_KEY) as ArticleView || ArticleView.SMALL;
        },
        setArticlesView: (state) => {
            state.view = state.view === ArticleView.SMALL ? ArticleView.BIG : ArticleView.SMALL;
            localStorage.setItem(VIEW_LOCAL_STORAGE_KEY, state.view);
        },
        setArticlesListSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
        },
        setArticlesListType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
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
