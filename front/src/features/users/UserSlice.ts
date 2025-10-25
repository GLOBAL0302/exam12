import { createSlice } from '@reduxjs/toolkit';
import type { IGlobalError, IUserFields, IValidationError } from '../../types';
import { googleLoginThunk, logInThunk, signInThunk } from './userThunk';

type UserInitialState = {
  user: IUserFields | null;
  signInLoading: boolean;
  signInError: IValidationError | null;
  loginLoading: boolean;
  loginError: IGlobalError | null;
};

const initialState: UserInitialState = {
  user: null,
  signInLoading: false,
  signInError: null,
  loginLoading: false,
  loginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unSetUser: (state) => {
      state.user = null;
    },
    unSetSignInError: (state) => {
      state.signInError = null;
    },
    unSetLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(signInThunk.pending, (state) => {
        state.signInLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, { payload }) => {
        state.signInLoading = false;
        state.user = payload;
      })
      .addCase(signInThunk.rejected, (state, { payload }) => {
        state.signInLoading = false;
        state.signInError = payload || null;
      });

    buider
      .addCase(logInThunk.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(logInThunk.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        state.user = payload;
      })
      .addCase(logInThunk.rejected, (state, { payload }) => {
        state.loginLoading = false;
        state.loginError = payload || null;
      });

    buider
      .addCase(googleLoginThunk.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(googleLoginThunk.fulfilled, (state, { payload }) => {
        state.loginLoading = false;
        state.user = payload;
      })
      .addCase(googleLoginThunk.rejected, (state, { payload }) => {
        state.loginLoading = false;
        state.loginError = payload || null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserSignInLoading: (state) => state.signInLoading,
    selectUserSignInError: (state) => state.signInError,
    selectUserLoginLoading: (state) => state.loginLoading,
    selectUserLoginError: (state) => state.loginError,
  },
});

export const userReducer = userSlice.reducer;
export const {
  selectUser,
  selectUserLoginError,
  selectUserLoginLoading,
  selectUserSignInError,
  selectUserSignInLoading,
} = userSlice.selectors;
export const { unSetUser, unSetSignInError, unSetLoginError } = userSlice.actions;
