import { StateSchema } from 'app/providers/StoreProvider';

export const getUserAuthData = (state: StateSchema) => state.user?.authData;
export const getUserInited = (state:StateSchema) => state.user?._inited;
export const getUserData = (state:StateSchema) => state.user?.userData;
