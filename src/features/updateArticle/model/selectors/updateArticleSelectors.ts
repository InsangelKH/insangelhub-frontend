import { StateSchema } from 'app/providers/StoreProvider';

export const getUpdateArticleTitle = (state: StateSchema) => state.updateArticle?.title;
export const getUpdateArticleSubtitle = (state: StateSchema) => state.updateArticle?.subtitle;
export const getUpdateArticleTypes = (state: StateSchema) => state.updateArticle?.types;
export const getUpdateArticleBlocksToCreate = (state: StateSchema) => state.updateArticle?.blocksToCreate;
export const getUpdateArticleBlocks = (state: StateSchema) => state.updateArticle?.blocks;
export const getUpdateArticleIsLoading = (state: StateSchema) => state.updateArticle?.isLoading;
export const getUpdateArticleError = (state: StateSchema) => state.updateArticle?.error;
export const getUpdateArticleImageFile = (state: StateSchema) => state.updateArticle?.imageFile;
export const getUpdateArticleImage = (state: StateSchema) => state.updateArticle?.image;
export const getUpdateArticleFiles = (state: StateSchema) => state.updateArticle?.files;
export const getUpdateArticleResponse = (state:StateSchema) => state.updateArticle?.articleResponse;
export const getUpdateArticleEmptyFieldError = (state: StateSchema) => state.updateArticle?.emptyFieldError;
export const getUpdateArticleEditedFlag = (state: StateSchema) => state.updateArticle?.edited;
export const getUpdatedArticleData = (state: StateSchema) => state.updateArticle?.updatedArticle;
