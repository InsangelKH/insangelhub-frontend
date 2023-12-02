import { StateSchema } from 'app/providers/StoreProvider';

export const getCommentText = (state: StateSchema) => state.comments?.text;
export const getCommentList = (state: StateSchema) => state.comments?.commentList;
export const getCommentIsLoading = (state: StateSchema) => state.comments?.isLoading;
export const getCommentError = (state: StateSchema) => state.comments?.error;
