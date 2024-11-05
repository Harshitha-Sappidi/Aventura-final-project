import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import {Package} from '../../models/package';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.scss';

interface ImageCarouselProps {
    images: Package;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    return (
        <Carousel showThumbs={true} autoPlay infiniteLoop>
            {images.images.map((image, index) => (
                <div key={index}>
                    <img src={image.path} alt={image.altText} />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
