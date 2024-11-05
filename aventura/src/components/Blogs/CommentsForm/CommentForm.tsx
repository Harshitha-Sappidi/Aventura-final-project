import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CommentItem } from '../../../models/blog'; 
import { t } from 'i18next';
import './CommentForm.scss'; 

interface CommentFormProps {
  onAddComment: (newComment: Omit<CommentItem, 'commentId' | 'date'> & { commentId: string; date: string; }) => void;
  currentCommentCount: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment, currentCommentCount }) => {
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCommentId = `com${(currentCommentCount + 1).toString().padStart(3, '0')}`;

    const newComment: Omit<CommentItem, 'commentId' | 'date'> & { commentId: string; date: string; } = {
      commenterName: name,
      email,
      content: comment,
      commenterPhoto: '', // Add logic to set the commenter's photo if needed
      commentId: newCommentId,
      date: new Date().toISOString(),
    };

    onAddComment(newComment);

    // Clear form fields after submission
    setComment('');
    setName('');
    setEmail('');
  };

  return (
    <Box className="commentForm" component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">{t("leave_a_reply")}</Typography>
      <Box className="formRow">
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={t("comments")}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          className="formField fullWidth"
        />
      </Box>
      <Grid container spacing={2} className="formRow">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name*"
            value={t("name")}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email*"
            value={t("email_personal")}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Box className="buttonContainer">
        <Button type="submit" variant="contained" color="primary" size="small" startIcon={<SendIcon />}>
          {t("post_comment")}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentForm;
