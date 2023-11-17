import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm, getProfileImageFile } from 'entities/Profile/model/selectors/profileSelectors';
import { Profile } from 'entities/Profile/model/types/profile';
import { fetchProfileData } from 'entities/Profile/model/services/fetchProfileData';
import { updateProfileAvatar } from './updateProfileAvatar';

export const updateProfile = createAsyncThunk<
    { user: Profile },
    void,
    ThunkConfig<string>
>(
    'profileSlice/updateProfile',
    async (authData, thunkApi) => {
        const {
            extra, dispatch, getState, rejectWithValue,
        } = thunkApi;

        const profile = getProfileForm(getState());
        const imageFile = getProfileImageFile(getState());
        const id = profile?.id;

        const body = {
            user: {
                email: profile?.email,
                username: profile?.username,
                bio: profile?.bio,
            },
        };

        try {
            const response = await extra.api.put<{ user: Profile }>('/user', body);

            if (!response.data) {
                throw new Error();
            }

            if (imageFile) {
                dispatch(updateProfileAvatar());
            }

            if (id) {
                dispatch(fetchProfileData({ id }));
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
