import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  IGlobalError,
  IUserFields,
  IUserLoginMutation,
  IUserRegisterMuation,
  IValidationError,
} from '../../types';
import { axiosApi } from '../../axiosApi';
import { isAxiosError } from 'axios';
import type { Rootstate } from '../../app/store';
import { unSetUser } from './userSlice';

export const signInThunk = createAsyncThunk<IUserFields, IUserRegisterMuation, { rejectValue: IValidationError }>(
  'user/signInThunk',
  async (registerForm, { rejectWithValue }) => {
    try {
      const dataForm = new FormData();
      const keys = Object.keys(registerForm) as (keyof IUserRegisterMuation)[];
      keys.forEach((key) => {
        const value = registerForm[key];
        if (value !== null) {
          dataForm.append(key, value);
        }
      });
      const { data } = await axiosApi.post('/users', dataForm);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data.error);
      }
      throw e;
    }
  },
);

export const logInThunk = createAsyncThunk<IUserFields, IUserLoginMutation, { rejectValue: IGlobalError }>(
  'user/logInThunk',
  async (LoginForm, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post('/users/session', LoginForm);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const logOutThunk = createAsyncThunk<void, void, { state: Rootstate }>(
  'user/logOutThunk',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/session');
    dispatch(unSetUser());
  },
);

export const googleLoginThunk = createAsyncThunk<IUserFields, string, { rejectValue: IGlobalError }>(
  'user/googleLoginThunk',
  async (credential, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<IUserFields>('/users/google', { credential });
      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
