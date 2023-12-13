import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ArticleType, BlockType, ImageBlock } from 'entities/Article/model/types/article';
import { BlocksToCreateInterface } from 'features/createArticle/model/types/CreateArticleSchema';
import { setUpdateArticleData } from '../services/setUpdateArticleData';
import { UpdateArticleSchema } from '../types/UpdateArticleSchema';
import { updateArticleAsync } from '../services/updateArticleAsync';

const initialState: UpdateArticleSchema = {
    title: '',
    subtitle: '',
    types: [],
    blocks: [],
    blocksToCreate: [],
    files: [],
};

export const updateArticleSlice = createSlice({
    name: 'updateArticleSlice',
    initialState,
    reducers: {
        setArticleResponse: (state, action: PayloadAction< {article: Article }>) => {
            state.articleResponse = { ...action.payload.article };
        },
        setArticleTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setInitialTypes: (state, action: PayloadAction<ArticleType[]>) => {
            state.types = [...action.payload];
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
        setInitialBlocks: (state, action: PayloadAction<BlockType[]>) => {
            state.blocks = action.payload.map((block, index) => ({ id: index + 1, blockData: block }));
        },
        setArticleBlock: (state, action: PayloadAction<BlockType>) => {
            let index = 1;
            if (state.blocks.length > 0) {
                const maxId = Math.max(...state.blocks.map((block) => block.id));
                index = maxId + 1;
            }
            state.blocks.push({ id: index, blockData: action.payload });
        },
        setEditedBlock: (state, action: PayloadAction<{ id: number, blockData: BlockType}>) => {
            const index = state.blocks.findIndex((item) => item.id === action.payload.id);

            if (index !== -1) {
                state.blocks[index] = action.payload;
            }
        },
        setEditedFlag: (state, action: PayloadAction<boolean>) => {
            state.edited = action.payload;
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
        setInitialArticleImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setArticleImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        removeArticleImage: (state) => {
            state.image = undefined;
        },
        removeImageFile: (state) => {
            const imageFileToRemove = state.imageFile;
            state.imageFile = undefined;

            if (imageFileToRemove) {
                state.files = state.files?.filter((file) => file !== imageFileToRemove);
            }
        },
        setFilesArray: (state, action: PayloadAction<File>) => {
            state.files.push(action.payload);
        },
        setArticleEmptyFieldError: (state, action: PayloadAction<boolean>) => {
            state.emptyFieldError = action.payload;
        },
        setUpdateArticleData: (state, action: PayloadAction< {article: Article }>) => {
            state.updatedArticle = { ...action.payload.article };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateArticleAsync.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateArticleAsync.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateArticleAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: updateArticleActions } = updateArticleSlice;
export const { reducer: updateArticleReducer } = updateArticleSlice;
