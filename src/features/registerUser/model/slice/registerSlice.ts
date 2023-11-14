import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RegisterSchema } from '../types/RegisterSchema';
import { registerUser } from '../services/registerUser';

const initialState: RegisterSchema = {
    email: '',
    username: '',
    password: '',
    isLoading: false,
};

export const registerSlice = createSlice({
    name: 'registerSlice',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
