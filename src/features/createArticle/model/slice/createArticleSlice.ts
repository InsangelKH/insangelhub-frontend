import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleType, BlockType } from 'entities/Article/model/types/article';
import { BlocksToCreateInterface, CreateArticleSchema } from '../types/CreateArticle';

const initialState: CreateArticleSchema = {
    title: '',
    subtitle: '',
    types: [],
    blocks: [],
    blocksToCreate: [],
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
                state.types.splice(index, 1);
            } else {
                state.types.push(action.payload);
            }
        },
        setBlockToCreate: (state, action: PayloadAction<BlocksToCreateInterface>) => {
            state.blocksToCreate.push(action.payload);
        },
        removeBlockToCreate: (state, action: PayloadAction<number>) => {
            const index = state.blocksToCreate.findIndex(
                (block) => block.id === action.payload,
            );

            if (index !== -1) {
                state.blocksToCreate.splice(index, 1);
            }
        },
        setArticleBlock: (state, action: PayloadAction<BlockType>) => {
            let index = 1;
            if (state.blocks.length > 0) {
                const maxId = Math.max(...state.blocks.map((block) => block.id));
                index = maxId + 1;
            }
            state.blocks.push({ id: index, blockData: action.payload });
        },
        removeArticleBlock: (state, action: PayloadAction<number>) => {
            const index = state.blocks.findIndex((block) => block.id === action.payload);

            if (index !== -1) {
                state.blocks.splice(index, 1);
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
