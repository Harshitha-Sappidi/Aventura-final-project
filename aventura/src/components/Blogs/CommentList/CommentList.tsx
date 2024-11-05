import React from 'react';
import { Box } from '@mui/material';
import Comment from '../CommentItem/Comment'; // Adjust the path as necessary
import { CommentItem as CommentItemType } from '../../../models/blog';
import './CommentList.scss';

interface CommentListProps {
  comments: CommentItemType[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <Box className="comment-list">
      {comments.map(comment => (
      <Comment key={comment.commentId} comment={comment} />
      ))}
    </Box>
  );
};

export default CommentList;
