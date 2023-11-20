import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesList = (state:StateSchema) => state.articlesList?.articlesList;
export const getArticlesListCount = (state: StateSchema) => state.articlesList?.articlesCount;
export const getArticlesListIsLoading = (state: StateSchema) => state.articlesList?.isLoading;
export const getArticlesListError = (state: StateSchema) => state.articlesList?.error;
export const getArticleListView = (state: StateSchema) => state.articlesList?.view;
