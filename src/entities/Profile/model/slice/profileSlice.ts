import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { updateProfile } from 'features/updateProfile/model/services/updateProfile';
import { fetchProfileData } from '../services/fetchProfileData';
import { Profile, ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        setProfileData: (state, action: PayloadAction<Profile>) => {
            state.data = action.payload;
        },
        setProfileForm: (state, action: PayloadAction<Profile>) => {
            state.form = action.payload;
        },
        onEdit: (state) => {
            state.readonly = false;
        },
        onCancel: (state) => {
            state.readonly = true;
            state.form = state.data;
            state.imageFile = undefined;
        },
        updateForm: (state, action: PayloadAction<Profile>) => {
            state.form = { ...state.form, ...action.payload };
        },
        setImageFile: (state, action: PayloadAction<File>) => {
            state.imageFile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.readonly = true;
                state.form = state.data;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
