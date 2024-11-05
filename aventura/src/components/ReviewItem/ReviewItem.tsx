import React from 'react';
import { Box, Typography, Avatar, Rating } from '@mui/material';
import { ReviewItem as ReviewItemType } from '../../models/package';
import './ReviewItem.scss';

interface ReviewItemProps {
    review: ReviewItemType;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
    console.log(review.reviewDate);
    const formattedDate = new Date(review.reviewDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Box className="review-item">
            <Box className="review-author">
                <Avatar src={review.userPicture} alt={review.userName} className="review-avatar" />
                <Typography variant="body1" className="review-user">{review.userName}</Typography>
            </Box>
            <Box className="review-content">
                <Box className="review-info">
                    <Rating value={review.rating} readOnly />
                    <Typography variant="caption" className="review-date">{formattedDate}</Typography>
                </Box>
                <Typography variant="body2" className="review-text">{review.review}</Typography>
            </Box>
        </Box>
    );
};

export default ReviewItem;
