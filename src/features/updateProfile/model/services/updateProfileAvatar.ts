import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileImageFile } from 'entities/Profile/model/selectors/profileSelectors';
import { Profile } from 'entities/Profile/model/types/profile';

export const updateProfileAvatar = createAsyncThunk<
    { user: Profile },
    void,
    ThunkConfig<string>
>(
    'profileSlice/updateProfileAvatar',
    async (authData, thunkApi) => {
        const {
            extra, dispatch, getState, rejectWithValue,
        } = thunkApi;

        const imageFile = getProfileImageFile(getState());

        const formData = new FormData();
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await extra.api.put<{ user: Profile }>('/user', formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
