import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localstorage';
import { addQueryParams } from 'shared/lib/addQueryParams/addQueryParams';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
    page: 1,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<string>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
            state._inited = true;
        },
        setUserData: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state.authData = undefined;
            state.userData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        },
        setArticlePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            addQueryParams({ page: state.page.toString() });
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
