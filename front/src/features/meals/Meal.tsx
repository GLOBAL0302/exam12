import React, { useState } from 'react';
import type { IMeal } from '../../types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { apiUrl } from '../../GlobalConstant';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  meal: IMeal;
}

const Meal: React.FC<Props> = ({ meal }) => {
    
 
  const navigate = useNavigate();
  let image;
  if (meal.image) {
    image = apiUrl + '/' + meal.image;
  }
  return (
    <div>
      <Card sx={{ width: '20rem' }} className="relative" onClick={() => navigate(`/${meal._id}`)}>
        <CardMedia sx={{ height: 140 }} image={image} title={meal.title} />
        <CardContent>
          <Typography gutterBottom variant="h4" component="p">
            {meal.title}
          </Typography>
          <Typography variant="subtitle1" component="p">
            Meal by: {meal.user.displayName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meal;
