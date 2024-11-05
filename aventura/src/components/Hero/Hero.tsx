import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { assets } from '../../services/assets';
import { useTranslation } from "react-i18next";

const heroContent = [

  {
    image: assets.hero1_img,
    title: "adventure",
    subtitle: "begins_here",
  },
  {
    image: assets.hero2_img,
    title: "explore",
    subtitle: "the_unknown",
  },
  {
    image: assets.hero3_img,
    title: "discover",
    subtitle: "new_horizon",
  },
  {
    image: assets.hero4_img,
    title: "embrace",
    subtitle: "the_journey",
  },
];

const Hero: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? heroContent.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === heroContent.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const currentSlide = heroContent[currentIndex];

  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        transition: 'background-image 0.5s linear',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2,
          fontFamily: 'Archivo, sans-serif',
        }}
      >
        {t(currentSlide.title)}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: '5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 4,
          fontFamily: 'Archivo, sans-serif',
        }}
      >
        {t(currentSlide.subtitle)}
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: 'white',
          color: 'black',
          fontWeight: 'bold',
          fontFamily: 'Archivo, sans-serif',
        }}
      >
       {t("read_more")}
      </Button>
      <Box sx={{ position: 'absolute', bottom: 20, display: 'flex', gap: 2 }}>
        {heroContent.map((_, slideIndex) => (
          <Box
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: slideIndex === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
      <IconButton
        onClick={goToPrevious}
        sx={{ position: 'absolute', left: 20, color: 'white' }}
      >
        <img src={assets.back_arrow} alt="left arrow" style={{ width: '50px', height: '50px' }} />
      </IconButton>
      <IconButton
        onClick={goToNext}
        sx={{ position: 'absolute', right: 20, color: 'white' }}
      >
        <img src={assets.next_arrow} alt="right arrow" style={{ width: '50px', height: '50px' }} />
      </IconButton>
    </Box>
  );
};

export default Hero;
