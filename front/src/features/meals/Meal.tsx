import React from 'react';
import type { IMeal } from '../../types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { apiUrl } from '../../GlobalConstant';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

interface Props {
  meal: IMeal;
}

const Meal: React.FC<Props> = ({ meal }) => {
  const navigate = useNavigate();
  let image;
  if (meal.image) {
    image = apiUrl + '/' + meal.image;
  }

  const navigateToMeal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/meals/${meal.user._id}`);
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Meal;
