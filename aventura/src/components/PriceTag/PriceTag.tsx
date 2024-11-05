import React from 'react';
import { Box, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './PriceTag.scss';

interface PriceTagProps {
    price: number;
    description: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, description }) => {
    return (
        <Box className="price-tag">
            <Box className="price-tag-top">
                <LocalOfferIcon className="price-icon" />
                <Typography variant="h4" className="price-amount">${price}</Typography>
            </Box>
            <Box className="price-tag-bottom">
                <Typography variant="body1" className="price-description">{description}</Typography>
            </Box>
        </Box>
    );
};

export default PriceTag;
