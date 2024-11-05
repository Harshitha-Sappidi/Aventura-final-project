import React, { useState } from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import { CommentItem as CommentItemType } from '../../../models/blog';
import './Comment.scss';

interface CommentProps {
  comment: CommentItemType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const formattedDate = new Date(comment.date).toLocaleDateString();

  return (
    <Box className="comment-item">
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar src={comment.commenterPhoto} alt={comment.commenterName} className="comment-avatar" />
        </Grid>
        <Grid item xs>
          <Typography variant="body1" className="comment-user">{comment.commenterName}</Typography>
          <Typography variant="caption" className="comment-date">{formattedDate}</Typography>
          <Box className="comment-content">
            <Typography variant="body2">{comment.content}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Comment;
