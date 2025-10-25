import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMeals, selectMealsFetching } from './mealSlice';
import { fetchMealsThunk } from './mealThunks';
import LinearProgress from '@mui/material/LinearProgress';
import Meal from './Meal';
import { useParams } from 'react-router-dom';

const Meals = () => {
  const meals = useAppSelector(selectMeals);
  const { userId } = useParams();
  const fetchingMeals = useAppSelector(selectMealsFetching);
  const dispatch = useAppDispatch();

  const fetchMeal = useCallback(async () => {
    if (userId) {
      await dispatch(fetchMealsThunk(userId)).unwrap();
    } else {
      await dispatch(fetchMealsThunk(''));
    }
  }, [userId]);

  useEffect(() => {
    void fetchMeal();
  }, [dispatch, fetchMeal, userId]);
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
