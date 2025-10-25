import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMeals, selectMealsFetching } from './mealSlice';
import { fetchMealsThunk } from './mealThunks';
import LinearProgress from '@mui/material/LinearProgress';
import Meal from './Meal';

const Meals = () => {
  const meals = useAppSelector(selectMeals);
  const fetchingMeals = useAppSelector(selectMealsFetching);
  const dispatch = useAppDispatch();

  const fetchMeal = useCallback(async () => {
    await dispatch(fetchMealsThunk(''));
  }, []);

  useEffect(() => {
    void fetchMeal();
  }, [dispatch, fetchMeal]);
  return (
    <div className="flex flex-wrap gap-3">
      {fetchingMeals && <LinearProgress />}
      {meals.map((meal) => (
        <Meal key={meal._id} meal={meal} />
      ))}
    </div>
  );
};

export default Meals;
