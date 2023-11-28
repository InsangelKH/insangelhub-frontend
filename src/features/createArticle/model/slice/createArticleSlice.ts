import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleType, BlockType, ImageBlock } from 'entities/Article/model/types/article';
import { BlocksToCreateInterface, CreateArticleSchema } from '../types/CreateArticle';
import { createArticleAsync } from '../services/createArticleAsync';

const initialState: CreateArticleSchema = {
    title: '',
    subtitle: '',
    types: [],
    blocks: [],
    blocksToCreate: [],
    files: [],
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
                const block = state.blocks[index];
                if (block.blockData.type === 'IMAGE') {
                    const imageBlock = block.blockData as ImageBlock;
                    const imageName = imageBlock.src;

                    const fileIndex = state.files.findIndex((file) => file.name === imageName);

                    if (fileIndex !== -1) {
                        state.files.splice(fileIndex, 1);
                    }
                }

                state.blocks.splice(index, 1);
            }
        },
        setImageFile: (state, action: PayloadAction<File>) => {
            state.imageFile = action.payload;
            state.files?.push(action.payload);
        },
        removeImageFile: (state) => {
            const imageFileToRemove = state.imageFile;
            state.imageFile = undefined;

            if (imageFileToRemove) {
                state.files = state.files?.filter((file) => file !== imageFileToRemove);
            }
        },
        setFilesArray: (state, action: PayloadAction<File>) => {
            state.files?.push(action.payload);
        },
        setArticleImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        removeArticleImage: (state) => {
            state.image = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createArticleAsync.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createArticleAsync.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createArticleAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: createArticleActions } = createArticleSlice;
export const { reducer: createArticleReducer } = createArticleSlice;
