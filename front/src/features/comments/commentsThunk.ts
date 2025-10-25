import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IComment, ICommentMutation } from '../../types';
import { axiosApi } from '../../axiosApi';

export const fetchCommentsThunk = createAsyncThunk<IComment[], string>(
  'comments/fetchCommentsThunk',
  async (mealId) => {
    try {
      const { data } = await axiosApi.get(`/comments?mealId=${mealId}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const postCommentThunk = createAsyncThunk<void, ICommentMutation>(
  'comments/postCommentThunk',
  async (commentForm) => {
    try {
      await axiosApi.post('/comments', commentForm);
    } catch (e) {
      console.log(e);
    }
  },
);

export const deleteCommentThunk = createAsyncThunk<void, string>('meal/deleteCommentThunk', async (commentId) => {
  await axiosApi.delete(`/comments/${commentId}`);
});
