import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { profileActions } from '../slice/profileSlice';
import { Profile } from '../types/profile';

interface FetchProfileDataProps {
    id: string;
}

export const fetchProfileData = createAsyncThunk<
    Profile,
    FetchProfileDataProps,
    ThunkConfig<string>
>(
    'profileSlice/fetchProfileData',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const body = {
            id: authData.id,
        };

        try {
            const response = await extra.api.post<{ user: Profile }>('/profile', body);

            if (!response.data) {
                throw new Error();
            }

            const data = response.data.user;

            dispatch(profileActions.setProfileData(data));

            return data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
