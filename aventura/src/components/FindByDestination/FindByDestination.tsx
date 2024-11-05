import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { t } from 'i18next';

interface Destination {
  name: string;
  image: string;
}

const destinations: Destination[] = [
  { name: t("brazil"), image: '/src/assets/brazil-southamerica.jpg' },
  { name: t('canada'), image: '/src/assets/canada.jpg' },
  { name: t('costa_rica'), image: '/src/assets/costa-rica.jpg' },
  { name: t('usa'), image: '/src/assets/usa.jpg' },
];

const DestinationSection: React.FC = () => {
  return (
    <Box sx={{ padding: '30px', textAlign: 'center', backgroundColor: 'white' }}>
      <Typography variant="h6" component="div" gutterBottom sx={{ color: '#555' }}>
        {t("find_a_tour_by")}
      </Typography>
      <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
        {t("destination")}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '50px', height: '4px', backgroundColor: '#007BFF' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 'calc(100% - 240px)', height: '1px', backgroundColor: '#ddd', marginBottom: '20px' }} />
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {destinations.map((destination, index) => (
          <Grid item key={index} xs={10} sm={5} md={3} lg={2.5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 300, margin: 'auto', position: 'relative' }}> 
              <CardMedia
                component="div"
                sx={{
                  height: 180,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'flex-end',
                  backgroundImage: `url(${destination.image})`,
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white', fontSize: '1.5rem', margin: '10px 0' }}>
                    {destination.name}
                  </Typography>
                </CardContent>
              </CardMedia>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DestinationSection;
