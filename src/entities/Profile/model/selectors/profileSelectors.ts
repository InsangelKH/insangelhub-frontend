import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileData = (state: StateSchema) => state.profile?.data;
export const getProfileForm = (state: StateSchema) => state.profile?.form;
export const getProfileReadonly = (state: StateSchema) => state.profile?.readonly;
export const getProfileIsLoading = (state: StateSchema) => state.profile?.isLoading;
export const getProfileError = (state: StateSchema) => state.profile?.error;
export const getProfileImageFile = (state: StateSchema) => state.profile?.imageFile;
export const getProfileEmptyField = (state: StateSchema) => state.profile?.emptyField;
