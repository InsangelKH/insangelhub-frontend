import { StateSchema } from 'app/providers/StoreProvider';

export const getCreateArticleTitle = (state: StateSchema) => state.createArticle?.title;
export const getCreateArticleSubtitle = (state: StateSchema) => state.createArticle?.subtitle;
export const getCreateArticleTypes = (state: StateSchema) => state.createArticle?.types;
export const getCreateArticleBlocksToCreate = (state: StateSchema) => state.createArticle?.blocksToCreate;
export const getCreateArticleBlocks = (state: StateSchema) => state.createArticle?.blocks;
export const getCreateArticleIsLoading = (state: StateSchema) => state.createArticle?.isLoading;
export const getCreateArticleError = (state: StateSchema) => state.createArticle?.error;
export const getCreateArticleImageFile = (state: StateSchema) => state.createArticle?.imageFile;
export const getCreateArticleImage = (state: StateSchema) => state.createArticle?.image;
export const getCreateArticleFiles = (state: StateSchema) => state.createArticle?.files;
