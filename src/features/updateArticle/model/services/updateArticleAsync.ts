import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { UpdateArticleSchema } from '../types/UpdateArticleSchema';
import { updateArticleActions } from '../slice/updateArticleSlice';

type UpdateArticleRequestype = Omit<UpdateArticleSchema, 'blocksToCreate'> & { slug: string };

export const updateArticleAsync = createAsyncThunk<
    { article: Article },
    UpdateArticleRequestype,
    ThunkConfig<string>
>(
    'updateArticleSlice/updateArticleAsync',
    async (articleData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const formData = new FormData();

        formData.append('title', articleData.title);
        formData.append('subtitle', articleData.subtitle);
        if (articleData.image) {
            formData.append('image', articleData.image);
        }
        if (Array.isArray(articleData.types)) {
            articleData.types.forEach((type, index) => {
                formData.append(`type[${index}]`, type);
            });
        }
        if (Array.isArray(articleData.blocks)) {
            articleData.blocks.forEach((block, index) => {
                formData.append(`blocks[${index}][type]`, block.blockData.type);
                if (block.blockData.type === 'TEXT') {
                    formData.append(`blocks[${index}][title]`, block.blockData.title);
                    block.blockData.paragraphs.forEach((paragraph, pIndex) => {
                        formData.append(`blocks[${index}][paragraphs][${pIndex}]`, paragraph);
                    });
                }
                if (block.blockData.type === 'IMAGE') {
                    formData.append(`blocks[${index}][title]`, block.blockData.title);
                    formData.append(`blocks[${index}][src]`, block.blockData.src);
                }
                if (block.blockData.type === 'CODE') {
                    formData.append(`blocks[${index}][code]`, block.blockData.code);
                }
            });
        }

        if (Array.isArray(articleData.files)) {
            articleData.files.forEach((file) => {
                formData.append('image', file);
            });
        }

        try {
            const response = await extra.api.put(`/articles/${articleData.slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(updateArticleActions.setUpdateArticleData(response.data));

            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
