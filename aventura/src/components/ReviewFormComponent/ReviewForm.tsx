import React, { useState } from 'react';
import { TextField, Button, Rating, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';


const styles: { [key: string]: React.CSSProperties } = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  errorMessage: {
    color: 'red',
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px', // Space between "Leave a Review" and separator
  },
  ratingText: {
    marginBottom: '4px',
  },
};

function ReviewForm({ productId, onReviewSubmit }: { productId: string, onReviewSubmit: (review: any) => Promise<void> }) {
  const { t } = useTranslation();
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewEmail, setReviewEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (reviewRating === null) {
      setError(t('rating_required'));
      return;
    }

    const newReview = {
      reviewItemId: new Date().getTime().toString(), // Unique ID for the review
      userId: 'random-user-id', // Replace this with actual user ID
      userName: reviewName,
      userPicture: 'path-to-user-picture', // Replace with actual picture path if available
      userEmail: reviewEmail,
      rating: reviewRating,
      review: reviewText,
      reviewGivenDate: new Date().toISOString(),
    };

    try {
      await onReviewSubmit(newReview);
      // Reset the form after successful submission
      setReviewRating(null);
      setReviewText('');
      setReviewName('');
      setReviewEmail('');
      setError(null);
    } catch (error) {
      console.error('Failed to add review:', error);
      setError(t('submit_review_error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <Typography component="legend" style={styles.boldText}>{t('leave_review')}</Typography>
      <Typography component="legend" style={styles.ratingText}>{t('rating')}</Typography>
      <Rating
        name="rating"
        value={reviewRating}
        onChange={(event, newValue) => {
          setReviewRating(newValue);
        }}
      />
      {error && <Typography style={styles.errorMessage}>{error}</Typography>}
      <TextField
        label={t('review')}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
        multiline
        rows={4}
      />
      <TextField
        label={t('name')}
        value={reviewName}
        onChange={(e) => setReviewName(e.target.value)}
        required
      />
      <TextField
        label={t('email_personal')}
        type="email"
        value={reviewEmail}
        onChange={(e) => setReviewEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {t('submit_review')}
      </Button>
    </form>
  );
}

export default ReviewForm;
