import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMeals, selectMealsFetching } from './mealSlice';
import { fetchMealsThunk } from './mealThunks';
import LinearProgress from '@mui/material/LinearProgress';
import Meal from './Meal';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from '../users/UserSlice';
import Button from '@mui/material/Button';

const Meals = () => {
  const meals = useAppSelector(selectMeals);
  const { userId } = useParams();
  const fetchingMeals = useAppSelector(selectMealsFetching);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  let isOwnRecipe = false;

  const fetchMeal = useCallback(async () => {
    if (userId) {
      await dispatch(fetchMealsThunk(userId)).unwrap();
    } else {
      await dispatch(fetchMealsThunk(''));
    }
  }, [userId, dispatch]);

  if (user && user._id === userId) {
    isOwnRecipe = true;
  }

  useEffect(() => {
    void fetchMeal();
  }, [dispatch, fetchMeal, userId]);

  if (!fetchingMeals && meals.length === 0 && userId) {
    return (
      <div className="text-center p-4 ">
        <p className="text-xl">No meals found for this user.</p>
      </div>
    );
  }

  return (
    <div className="">
      {fetchingMeals && <LinearProgress />}
      <p className="text-3xl uppercase">{userId && meals.length > 0 && meals[0]?.user?.displayName}</p>
      <div className="flex justify-end mb-4">
        <Button className="" variant="contained" onClick={() => navigate('/addMeals')}>
          Add Meal
        </Button>
      </div>
      <div className="flex justify-center flex-wrap gap-3">
        {meals.map((meal) => (
          <Meal key={meal._id} meal={meal} isOwnRecipe={isOwnRecipe} fetchMeal={() => fetchMeal()} />
        ))}
      </div>
    </div>
  );
};

export default Meals;
