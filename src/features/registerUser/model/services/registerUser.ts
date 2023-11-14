import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localstorage';

interface RegisterUserProps {
    email: string;
    username: string;
    password: string;
}

export const registerUser = createAsyncThunk<
    { user: User },
    RegisterUserProps,
    ThunkConfig<string>
>(
    'registerSlice/registerUser',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const body = {
            user: {
                email: authData.email,
                username: authData.password,
                password: authData.password,
            },
        };

        try {
            const response = await extra.api.post<{ user: User }>('/register', body);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data.user.token));
            dispatch(userActions.setAuthData(response.data.user.token));
            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue(e.message);
            }
            return rejectWithValue('Unknown error occurred');
        }
    },
);
