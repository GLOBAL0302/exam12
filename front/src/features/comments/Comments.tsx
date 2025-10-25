import React from 'react';
import type { IComment } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/UserSlice';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  comment: IComment;
  deleteFunc: (id: string) => void;
}

const Comments: React.FC<Props> = ({ comment, deleteFunc }) => {
  const user = useAppSelector(selectUser);

  const isOwnComment = user && comment.user && user._id === comment.user._id;

  return (
    <div className="p-1 border-2 relative">
      <p>Author: {comment.user.displayName}</p>
      <p className="text-xs">{comment.comment}</p>
      {isOwnComment && (
        <div className="absolute right-0 top-0">
          <IconButton aria-label="delete" size="large" color="error" onClick={() => deleteFunc(comment._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Comments;
