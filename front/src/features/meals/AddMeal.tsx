import { Card, formStyles, HeaderContainer, titleStyles, VisuallyHiddenInput } from '../users/UserRegister.style';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMealsSubmitting, selectMealsSubmittingError } from './mealSlice';
import { useState } from 'react';
import type { IMealMutation } from '../../types';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormHelperText from '@mui/material/FormHelperText';
import { submitMealThunk } from './mealThunks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { notifySuccess } from '../../utils/ToastifyFuncs/ToastConfig';

const initialState = {
  title: '',
  recipe: '',
  image: null,
};

const AddMeal = () => {
  const submittingMeal = useAppSelector(selectMealsSubmitting);
  const [addMealForm, setAddMealForm] = useState<IMealMutation>(initialState);
  const dispatch = useAppDispatch();
  const mealsubmitError = useAppSelector(selectMealsSubmittingError);
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(submitMealThunk(addMealForm)).unwrap();
      notifySuccess('Meal has been added');
      navigate("/")
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeRegisterForm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddMealForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setAddMealForm((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    }
  };

  const getError = (name: string) => {
    try {
      return mealsubmitError?.errors[name].message;
    } catch (e) {
      return;
    }
  };

  return (
    <div>
      <Card variant="outlined">
        <HeaderContainer className="">
          <Typography component="h4" variant="h5" sx={titleStyles}>
            Add Meal
          </Typography>
        </HeaderContainer>
        <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
          <FormControl>
            <FormLabel htmlFor="name">Title</FormLabel>
            <TextField
              required
              onChange={onChangeRegisterForm}
              autoComplete="title"
              name="title"
              fullWidth
              id="title"
              placeholder="Food name"
              helperText={getError('title')}
              error={Boolean(getError('title'))}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Recipe</FormLabel>
            <TextField
              required
              fullWidth
              name="recipe"
              placeholder="detail procedure"
              type="text"
              id="recipe"
              autoComplete="new-password"
              variant="outlined"
              onChange={onChangeRegisterForm}
              helperText={getError('recipe')}
              error={Boolean(getError('recipe'))}
            />
          </FormControl>
          <Button
            color={addMealForm.image ? 'success' : 'primary'}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={addMealForm.image ? <CloudDownloadIcon /> : <CloudUploadIcon />}
          >
            {addMealForm.image ? addMealForm.image.name.slice(1, 5) + '...' : 'Upload File'}

            <VisuallyHiddenInput type="file" onChange={changeFile} multiple />
          </Button>
          <FormHelperText error={Boolean(getError('image'))}>{getError('image')}</FormHelperText>

          <Button loading={submittingMeal} type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default AddMeal;
