import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Grid, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Package } from '../../models/package';
import iconMapping from '../../services/icon-mapping-service';
import { t } from 'i18next';

interface TourCardProps extends Package {}

const PopularTourCard: React.FC<TourCardProps> = ({
    id,
    title,
    description,
    oldPrice,
    newPrice,
    cardImage,
    duration,
    ratings,
    physicality,
    tags,
    offers
}) => {
    const navigate = useNavigate();

    const offerDetails = [
        { label: t('special_offer'), value: offers.specialOffer, backgroundColor: '#e60e9c' },
        { label: t('early_bird'), value: offers.earlyBird, backgroundColor: '#04c843' },
        { label: t('last_minute_deal'), value: offers.lastMinute, backgroundColor: 'lightcoral' },
    ];

    const icons = tags.map(tag => iconMapping[tag]).filter(Boolean);

    const handleCardClick = () => {
        navigate(`/packages/${id}`);
    };

    return (
        <Card
            sx={{
                maxWidth: 330,
                width: '100%',
                height: '450px', /* Set a fixed height for the card */
                margin: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s ease-in-out',
                    '& .MuiCardMedia-root': {
                        filter: 'brightness(0.8)',
                    },
                },
            }}
        >
            <Box sx={{ position: 'relative', height: '250px' }} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    height="100%"
                    image={cardImage}
                    alt={title}
                    sx={{
                        transition: 'filter 0.3s ease-in-out',
                    }}
                />
                {offerDetails.map(
                    (offer, index) =>
                        offer.value && (
                            <Box
                                key={index}
                                sx={{
                                    position: 'absolute',
                                    top: 26,
                                    left: 123,
                                    width: '100%',
                                    transform: `rotate(45deg)`,
                                    backgroundColor: offer.backgroundColor,
                                    padding: '5px 0',
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                            >
                                <Typography variant="body2">
                                    {offer.label}
                                </Typography>
                            </Box>
                        )
                )}
                <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} style={{ color: i < ratings ? 'gold' : 'grey' }} />
                    ))}
                </Box>
                <Box sx={{ position: 'absolute', top: 220, left: 10, display: 'flex', color: 'white' }}>
                    {icons.map((icon, index) => (
                        <Box key={index} sx={{ margin: '0 10px' }}>
                            {icon}
                        </Box>
                    ))}
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 210,
                        right: -5,
                        backgroundColor: '#007BFF',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {oldPrice ? (
                        <>
                            <Typography variant="body2" color="inherit" sx={{ textDecoration: 'line-through', marginRight: '5px' }}>
                                ${oldPrice}
                            </Typography>
                            <Typography variant="h6" color="inherit">
                                ${newPrice}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="h6" color="inherit">
                            ${newPrice}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Divider sx={{ backgroundColor: '#348ff1', height: '4px' }} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <AccessTimeIcon sx={{ color: '#007BFF', fontSize: '20px', marginRight: '8px' }} />
                            <Typography variant="body2" color="text.secondary">
                                {duration} days
                            </Typography>
                        </Box>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <FitnessCenterIcon sx={{ color: '#007BFF', fontSize: '20px', marginRight: '8px' }} />
                            <Typography variant="body2" color="text.secondary">
                                {physicality} / 10
                            </Typography>
                        </Box>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <ArrowRightAltIcon sx={{ color: '#007BFF', fontSize: '20px', marginRight: '8px' }} />
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PopularTourCard;
