import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { userActions } from '../slice/userSlice';
import { User } from '../types/user';

export const fetchUserData = createAsyncThunk<
    { user: User },
    void,
    ThunkConfig<string>
>(
    'userSlice/fetchUserData',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<{ user: User }>('/user');

            if (!response.data) {
                throw new Error();
            }
            dispatch(userActions.setUserData(response.data.user));
            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
