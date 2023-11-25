import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleType } from 'entities/Article/model/types/article';
import { CreateArticleSchema } from '../types/CreateArticle';

const initialState: CreateArticleSchema = {
    title: '',
    subtitle: '',
    types: [],
    blocks: [],
};

export const createArticleSlice = createSlice({
    name: 'createArticleSlice',
    initialState,
    reducers: {
        setArticleTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setArticleSubtitle: (state, action: PayloadAction<string>) => {
            state.subtitle = action.payload;
        },
        setArticleTypes: (state, action: PayloadAction<ArticleType>) => {
            const index = state.types?.indexOf(action.payload);

            if (index !== undefined && index !== -1) {
                state.types?.splice(index, 1);
            } else {
                state.types?.push(action.payload);
            }
        },
    },
    //  extraReducers: (builder) => {
    //  builder
    //  .addCase('createArticleSlice'.pending, (state, action) => {
    //     state.error = undefined;
    //     state.isLoading = true;
    //  })
    //  .addCase('createArticleSlice'.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //  })
    //  .addCase('createArticleSlice'.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //  })
    //  },
});

export const { actions: createArticleActions } = createArticleSlice;
export const { reducer: createArticleReducer } = createArticleSlice;
