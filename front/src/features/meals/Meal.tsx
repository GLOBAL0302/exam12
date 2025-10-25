import React from 'react';
import type { IMeal } from '../../types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { apiUrl } from '../../GlobalConstant';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../app/hooks';
import { deleteOneMealThunk } from './mealThunks';
import { notifySuccess } from '../../utils/ToastifyFuncs/ToastConfig';

interface Props {
  meal: IMeal;
  isOwnRecipe: boolean;
  fetchMeal: () => void;
}

const Meal: React.FC<Props> = ({ meal, isOwnRecipe, fetchMeal }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let image;
  if (meal.image) {
    image = apiUrl + '/' + meal.image;
  }

  const navigateToMeal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/meals/${meal.user._id}`);
  };
  const deleteMeal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await dispatch(deleteOneMealThunk(meal._id)).unwrap();
      notifySuccess('Meal is deleted');
      fetchMeal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Card sx={{ width: '20rem' }} className="relative" onClick={() => navigate(`/${meal._id}`)}>
        <CardMedia sx={{ height: 140 }} image={image} title={meal.title} />
        <CardContent>
          <Typography gutterBottom variant="h4" component="p">
            {meal.title}
          </Typography>
          <Button variant="outlined" onClick={(e) => navigateToMeal(e)}>
            Meal by: {meal.user.displayName}
          </Button>
          <div className="absolute top-0 right-0">
            {isOwnRecipe && (
              <Button onClick={deleteMeal} variant="contained" className="" color="error" startIcon={<DeleteIcon />}>
                delete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meal;
