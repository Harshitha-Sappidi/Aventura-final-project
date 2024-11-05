import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReviewItemComponent from '../ReviewItem/ReviewItem';
import { ReviewItem } from '../../models/package';
import './ReviewList.scss';

interface ReviewListProps {
    reviews: ReviewItem[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    const { t } = useTranslation();
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

    return (
        <Box className="review-list">
            <Box className="review-summary">
                <Rating value={averageRating} precision={0.5} readOnly />
                <Typography variant="body1">
                    {averageRating.toFixed(2)} {t('based_on')} {reviews.length} {t('reviews')}
                </Typography>
            </Box>
            {reviews.map(review => (
                <ReviewItemComponent key={review.reviewItemId} review={review} />
            ))}
        </Box>
    );
};

export default ReviewList;
