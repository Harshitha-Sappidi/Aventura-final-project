import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import CommentForm from '../CommentsForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import { CommentItem } from '../../../models/blog';
import { t } from 'i18next';
import './CommentSection.scss'; 

interface CommentSectionProps {
  comments: CommentItem[];
  onAddComment: (newComment: Omit<CommentItem, 'commentId' | 'date'>) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  return (
    <Box className="comment-section">
      <Typography variant="h6" component="div" className="comment-header">
        {t("commentsBlog")}
      </Typography>
      <Box className="dividerContainer">
        <Box className="blueLine" />
        <Divider />
      </Box>
      <CommentList comments={comments} />
      <CommentForm onAddComment={onAddComment} currentCommentCount={comments.length} />
    </Box>
  );
};

export default CommentSection;
