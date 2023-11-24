import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article, ArticleType } from 'entities/Article/model/types/article';
import { VIEW_LOCAL_STORAGE_KEY } from 'shared/consts/localstorage';
import { addQueryParams } from 'shared/lib/addQueryParams/addQueryParams';
import { ArticleView, ArticlesListSchema, SortType } from '../types/articlesList';
import { fetchArticlesList } from '../services/fetchArticlesList';
import { sortArticlesList } from '../services/sortArticlesList';

const initialState: ArticlesListSchema = {
    type: 'ALL',
    offset: 0,
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
            addQueryParams({ view: state.view });
        },
        setArticleViewFromQuery: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            addQueryParams({ view: state.view });
        },
        setArticlesView: (state) => {
            state.view = state.view === ArticleView.SMALL ? ArticleView.BIG : ArticleView.SMALL;
            localStorage.setItem(VIEW_LOCAL_STORAGE_KEY, state.view);
            addQueryParams({ view: state.view });
        },
        setArticlesListSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
            addQueryParams({ sort: state.sort });
        },
        setArticlesListType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
            if (state.type !== 'ALL') {
                addQueryParams({ type: state.type });
            } else {
                addQueryParams({ type: '' });
            }
        },
        setArticlesListOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
            addQueryParams({ offset: state.offset.toString() });
        },
        setArticlesListSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            addQueryParams({ search: state.search });
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
            })
            .addCase(sortArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(sortArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(sortArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlesListActions } = articlesListSlice;
export const { reducer: articlesListReducer } = articlesListSlice;
