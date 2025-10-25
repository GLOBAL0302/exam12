import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IMeal, IMealMutation, IValidationError } from '../../types';
import { axiosApi } from '../../axiosApi';
import { isAxiosError } from 'axios';

export const submitMealThunk = createAsyncThunk<void, IMealMutation, { rejectValue: IValidationError }>(
  'meal/submitMealThunk',
  async (mealForm, { rejectWithValue }) => {
    try {
      const dataForm = new FormData();
      const keys = Object.keys(mealForm) as (keyof IMealMutation)[];
      keys.forEach((key) => {
        const value = mealForm[key];
        if (value !== null) {
          dataForm.append(key, value);
        }
      });
      await axiosApi.post('/meals', dataForm);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const fetchMealsThunk = createAsyncThunk<IMeal[], string>('meal/fetchMealsThunk', async (mealParam) => {
  try {
    const { data } = await axiosApi.get(`/meals?userId=${mealParam}`);
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const deleteOneMealThunk = createAsyncThunk<void, string>('meal/deleteOneMealThunk', async (mealId) => {
  await axiosApi.delete(`/meals/${mealId}`);
});
