import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localstorage';

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    { user: User },
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'loginSlice/loginByUsername',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const body = {
            user: {
                email: authData.email,
                password: authData.password,
            },
        };

        try {
            const response = await extra.api.post<{ user: User }>('/login', body);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data.user.token));
            dispatch(userActions.setAuthData(response.data.user.token));
            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                console.error('Error during login:', e.message);
            } else {
                console.error('Unknown error during login');
            }
            return rejectWithValue('error');
        }
    },
);
