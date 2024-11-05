import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReviewItem } from '../../models/package';
import './ReviewForm.scss';

interface ReviewFormProps {
    onAddReview: (newReview: ReviewItem) => void;
    currentReviewCount: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview, currentReviewCount }) => {
    const { t } = useTranslation();
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newReviewId = `rev${(currentReviewCount + 1).toString().padStart(3, '0')}`;

        const newReview: ReviewItem = {
            reviewItemId: newReviewId,
            userId: 'new-user-id', // Ideally, this should come from the authenticated user context
            userName: name,
            userPicture: '', // Ideally, this should come from the authenticated user context
            userEmail: email,
            rating: rating || 0,
            review,
            reviewDate: new Date()
        };

        onAddReview(newReview);

        // Clear form fields after submission
        setRating(0);
        setReview('');
        setName('');
        setEmail('');
    };

    return (
        <Box className="review-form" component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">{t('leave_review')}</Typography>
            <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
            />
            <div className="form-row">
                <TextField
                    label={t('your_review')}
                    multiline
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    className="form-field full-width"
                />
            </div>
            <div className="form-row">
                <TextField
                    label={t('name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    className="form-field"
                />
                <TextField
                    label={t('email_personal')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    className="form-field"
                />
            </div>
            <Button type="submit" variant="contained" color="primary">{t('submit')}</Button>
        </Box>
    );
};

export default ReviewForm;
