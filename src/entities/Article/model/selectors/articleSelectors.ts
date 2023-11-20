import { StateSchema } from 'app/providers/StoreProvider';

const getArticles = (state: StateSchema) => state.article?.article;
const getArticlesIsLoading = (state: StateSchema) => state.article?.isLoading;
const getArticlesError = (state: StateSchema) => state.article?.error;
