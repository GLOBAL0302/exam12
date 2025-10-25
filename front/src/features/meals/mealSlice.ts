import { createSlice } from '@reduxjs/toolkit';
import type { IMeal, IValidationError } from '../../types';
import { submitMealThunk } from './mealThunks';

interface IMealSliceState {
  meals: IMeal[];
  mealsFetching: boolean;
  mealsSubmitting: boolean;
  mealsSubmittingError: IValidationError | null;
}

const initialState: IMealSliceState = {
  meals: [],
  mealsFetching: false,
  mealsSubmitting: false,
  mealsSubmittingError: null,
};

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitMealThunk.pending, (state) => {
      state.mealsSubmitting = true;
    });
    builder.addCase(submitMealThunk.fulfilled, (state) => {
      state.mealsSubmitting = false;
    });
    builder.addCase(submitMealThunk.rejected, (state, { payload }) => {
      state.mealsSubmitting = false;
      state.mealsSubmittingError = payload || null;
    });
  },
  selectors: {
    selectMeals: (state) => state.meals,
    selectMealsFetching: (state) => state.mealsFetching,
    selectMealsSubmitting: (state) => state.mealsSubmitting,
    selectMealsSubmittingError: (state) => state.mealsSubmittingError,
  },
});

export const mealReducer = mealSlice.reducer;
export const { selectMeals, selectMealsFetching, selectMealsSubmitting, selectMealsSubmittingError } =
  mealSlice.selectors;
