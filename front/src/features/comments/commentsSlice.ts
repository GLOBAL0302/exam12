import { createSlice } from '@reduxjs/toolkit';
import type { IComment, IValidationError } from '../../types';
import { fetchCommentsThunk, postCommentThunk } from './commentsThunk';

interface ICommentSlice {
  comments: IComment[];
  fetchingComments: boolean;
  submittingComments: boolean;
  submittingCommentsError: IValidationError | null;
}

const initialState: ICommentSlice = {
  comments: [],
  fetchingComments: false,
  submittingComments: false,
  submittingCommentsError: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsThunk.pending, (state) => {
        state.fetchingComments = true;
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, { payload }) => {
        state.fetchingComments = false;
        state.comments = payload;
      })
      .addCase(fetchCommentsThunk.rejected, (state) => {
        state.fetchingComments = false;
      });

    builder
      .addCase(postCommentThunk.pending, (state) => {
        state.submittingComments = true;
      })
      .addCase(postCommentThunk.fulfilled, (state) => {
        state.submittingComments = false;
      })
      .addCase(postCommentThunk.rejected, (state) => {
        state.submittingComments = false;
      });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectFetchingComments: (state) => state.fetchingComments,
    selectSubmittingComments: (state) => state.submittingComments,
    selectSubmittingCommentsError: (state) => state.submittingCommentsError,
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { selectComments, selectFetchingComments, selectSubmittingComments, selectSubmittingCommentsError } =
  commentsSlice.selectors;
