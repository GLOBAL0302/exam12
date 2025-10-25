import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMeals } from './mealSlice';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../GlobalConstant';
import { useCallback, useEffect, useState } from 'react';
import { selectComments } from '../comments/commentsSlice';
import { deleteCommentThunk, fetchCommentsThunk, postCommentThunk } from '../comments/commentsThunk';
import Comments from '../comments/Comments';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { selectUser } from '../users/UserSlice';

const initialState = '';

const MealDetail = () => {
  const [userText, setUserText] = useState(initialState);
  const { mealId } = useParams();
  const meal = useAppSelector(selectMeals).filter((item) => item._id === mealId)[0];
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let image;
  if (meal.image) {
    image = apiUrl + '/' + meal.image;
  }

  const getComment = useCallback(async () => {
    if (mealId) dispatch(fetchCommentsThunk(mealId));
  }, []);

  const deleteComment = async (commentId: string) => {
    try {
      await dispatch(deleteCommentThunk(commentId)).unwrap();
      await getComment();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    void getComment();
  }, [mealId, getComment, dispatch]);

  const submitComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user && mealId) {
        const commentForm = {
          user: user._id,
          meal: mealId,
          comment: userText,
        };
        await dispatch(postCommentThunk(commentForm)).unwrap();
        await getComment();
        setUserText(initialState);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Box component="div" className="gap-3">
        <Box component="div" className="flex justify-center">
          <img className="w-36 " src={image} alt={meal.title} />
        </Box>
        <Box component="div">
          <p className="font-extrabold underline text-3xl capitalize">{meal.title}</p>
          <p className="uppercase font-extrabold text-1xl">recipe</p>
          <p className="text-slate-700 text-xs">{meal.recipe}</p>
        </Box>
        <p className="uppercase text-1xl">comments</p>
        <Box component="div" className="overflow-scroll h-48  border border-3">
          {comments.map((comment) => (
            <Comments key={comment._id} comment={comment} deleteFunc={deleteComment} />
          ))}
        </Box>
        {user && (
          <Box component="form" onSubmit={submitComment}>
            <Box component="div">
              <FormControl>
                <FormLabel htmlFor="name">Title</FormLabel>
                <TextField
                  required
                  onChange={(e) => setUserText(e.target.value)}
                  autoComplete="title"
                  name="title"
                  fullWidth
                  id="title"
                  placeholder="Food name"
                  value={userText}
                />
              </FormControl>
            </Box>
            <Button variant="outlined" type="submit">
              add Comment
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default MealDetail;
