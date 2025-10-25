import React, { useState } from 'react';
import type { IMeal } from '../../types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { apiUrl } from '../../GlobalConstant';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/UserSlice';
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
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let image;

  if (meal.image) {
    image = apiUrl + '/' + meal.image;
  }

  const openModal = () => {
    setModal(true);
  };

  const closeModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setModal(false);
  };

  return (
    <div>
      <Card sx={{ width: '20rem' }} className="relative" onClick={() => openModal()}>
        <CardMedia sx={{ height: 140 }} image={image} title={meal.title} />
        <CardContent>
          <Typography gutterBottom variant="h4" component="p">
            {meal.title}
          </Typography>
          <Typography variant="subtitle1" component="p">
            Meal by: {meal.user.displayName}
          </Typography>
        </CardContent>

        <Modal
          open={modal}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box component="div" className="gap-3">
              <Box component="div" className='flex justify-center'>
                <img className='w-40 ' src={image}  alt={meal.title}/>
              </Box>
              <Box component="div">
                <p className="font-extrabold underline text-1xl capitalize">{meal.title}</p>
                <p className="uppercase font-extrabold text-xs">recipe</p>
                <p className="text-slate-700 text-xs">{meal.recipe}</p>
              </Box>
              <Box component="div">
                <p>comments</p>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Card>
    </div>
  );
};

export default Meal;
