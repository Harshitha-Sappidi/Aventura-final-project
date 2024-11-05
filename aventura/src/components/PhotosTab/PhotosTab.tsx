import React from 'react';
import { Box } from '@mui/material';
import { Package } from '../../models/package';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

interface PhotosTabProps {
    images: Package;
}

const PhotosTab: React.FC<PhotosTabProps> = ({ images }) => {
    return (
        <Box className="photos-tab">
            <ImageCarousel images={images} />
        </Box>
    );
};

export default PhotosTab;
