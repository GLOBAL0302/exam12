import { createSlice } from '@reduxjs/toolkit';
import type { IComment, IValidationError } from '../../types';

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
  extraReducers: (builder) => {},
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
