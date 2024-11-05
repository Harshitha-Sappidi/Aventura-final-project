import React from 'react';
import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PopularTourCard from '../PopularToursCard/PopularToursCard';
import { Package } from '../../models/package';
import { t } from 'i18next';

interface PopularToursListProps {
  packages: Package[];
}

const PopularToursList: React.FC<PopularToursListProps> = ({ packages }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const packagesToShow = isMobile ? 1 : 3;

  const filteredPackages = packages.filter(pkg => pkg.ratings === 5);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredPackages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredPackages.length - 1 : prevIndex - 1
    );
  };

  const getDisplayedPackages = () => {
    return filteredPackages.slice(currentIndex, currentIndex + packagesToShow).concat(
      filteredPackages.slice(0, Math.max(0, currentIndex + packagesToShow - filteredPackages.length))
    );
  };

  return (
    <Box
      sx={{
        padding: '30px',
        backgroundImage: 'url(/src/assets/popular-tours-bg.jpg)', // Use the uploaded image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#hsla(0,0%,13%,1)' }}>
        {t("most_popular_tours")}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Box sx={{ width: '50px', height: '4px', backgroundColor: '#007BFF' }} />
      </Box>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {getDisplayedPackages().map((pkg, index) => (
          <Grid item key={`${pkg.packageId}-${index}`} xs={12} sm={6} md={4} lg={4}>
            <PopularTourCard {...pkg} />
          </Grid>
        ))}
      </Grid>
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: isMobile ? '10px' : '20px',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          color: '#fff',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:active': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: '30px' }} />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: isMobile ? '10px' : '20px',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '40px',
          color: '#fff',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:active': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </Box>
  );
};

export default PopularToursList;
