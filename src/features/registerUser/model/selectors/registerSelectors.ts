import { StateSchema } from 'app/providers/StoreProvider';

export const getRegisterEmail = (state: StateSchema) => state.registerForm?.email ?? '';
export const getRegisterUsername = (state: StateSchema) => state.registerForm?.username ?? '';
export const getRegisterPassword = (state: StateSchema) => state.registerForm?.password ?? '';
export const getRegisterIsLoading = (state: StateSchema) => state.registerForm?.isLoading;
export const getRegisterError = (state: StateSchema) => state.registerForm?.error;
