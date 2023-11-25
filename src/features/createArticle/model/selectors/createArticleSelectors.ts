import { StateSchema } from 'app/providers/StoreProvider';

export const getCreateArticleTitle = (state: StateSchema) => state.createArticle?.title;
export const getCreateArticleSubtitle = (state: StateSchema) => state.createArticle?.subtitle;
export const getCreateArticleTypes = (state: StateSchema) => state.createArticle?.types;
export const getCreateArticleIsLoading = (state: StateSchema) => state.createArticle?.isLoading;
export const getCreateArticleError = (state: StateSchema) => state.createArticle?.error;
