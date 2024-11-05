import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReviewList from '../ReviewList/ReviewList';
import ReviewForm from '../ReviewForm/ReviewForm';
import { ReviewItem } from '../../models/package';
import './ReviewSection.scss';

interface ReviewSectionProps {
    reviews: ReviewItem[];
    onAddReview: (newReview: ReviewItem) => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, onAddReview }) => {
    const { t } = useTranslation();

    return (
        <Box className="review-section">
            <div className="review-title">
                <span>{t('tour_reviews')}</span>
                <div className="blue-line"></div>
            </div>
            <ReviewList reviews={reviews} />
            <ReviewForm onAddReview={onAddReview} currentReviewCount={reviews.length} />
        </Box>
    );
};

export default ReviewSection;
