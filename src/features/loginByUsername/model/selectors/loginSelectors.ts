import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginEmail = (state: StateSchema) => state.loginForm?.email ?? '';
export const getLoginPassword = (state: StateSchema) => state.loginForm?.password ?? '';
export const getLoginIsLoading = (state: StateSchema) => state.loginForm?.isLoading;
export const getLoginError = (state: StateSchema) => state.loginForm?.error;
