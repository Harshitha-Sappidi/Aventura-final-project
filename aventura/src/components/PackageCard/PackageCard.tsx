import React from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography, Button, Divider, Tooltip, IconButton } from '@mui/material';
import { Package } from '../../models/package';
import './PackageCard.scss';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import iconMapping from '../../services/icon-mapping-service';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PackageCardProps {
    packageItem: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageItem }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const icons = packageItem.tags.map(tag => iconMapping[tag]).filter(Boolean);

    const handleViewTourClick = () => {
        navigate(`/packages/${packageItem.id}`);
    };

    const handleShareClick = async () => {
        const shareUrl = `${window.location.origin}/packages/${packageItem.id}`;

        const shareData = {
            title: `Check out this package: ${packageItem.title}`,
            text: `
                ${packageItem.description}\n
                Duration: ${packageItem.duration === 1 ? `${packageItem.duration} ${t('day')}` : `${packageItem.duration} ${t('days')}`}\n
                Level: ${packageItem.level}\n
                Price: $${packageItem.newPrice.toFixed(2)} ${t('per_person')}\n
                Ratings: ${packageItem.ratings}/5\n
                View more details and book your tour here: ${shareUrl}
            `,
            url: shareUrl,
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.warn('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    };

    return (
        <Card className="package-card">
            <Grid container alignItems="center" className="package-container">
                <Grid item xs={4} className="image-container">
                    <CardMedia
                        component="img"
                        className="package-image"
                        image={packageItem.cardImage}
                        alt={packageItem.title}
                    />
                    {packageItem.offers.specialOffer && (
                        <Box className="offer-label special-offer">
                            <Typography variant="body2">{t('special_offer')}</Typography>
                        </Box>
                    )}
                    {packageItem.offers.earlyBird && (
                        <Box className="offer-label early-bird">
                            <Typography variant="body2">{t('early_bird')}</Typography>
                        </Box>
                    )}
                    {packageItem.offers.lastMinute && (
                        <Box className="offer-label last-minute">
                            <Typography variant="body2">{t('last_minute')}</Typography>
                        </Box>
                    )}
                    <Box className="icon-overlay">
                        {icons.map((icon, index) => {
                            const tag = packageItem.tags[index];
                            return (
                                <Tooltip key={index} title={t(tag)} arrow>
                                    <Box className="icon-container">
                                        {icon}
                                    </Box>
                                </Tooltip>
                            );
                        })}
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <CardContent className="package-left-content">
                        <Typography variant="h5" className="package-title">{packageItem.title}</Typography>
                        <Typography variant="body2" color="textSecondary" className="package-description">
                            {packageItem.description}
                        </Typography>
                        <Box component="section" className="info-container">
                            <Typography variant="body2" color="textSecondary" className="info-box">
                                <AccessTimeIcon className="fiClock-icon" />
                                {packageItem.duration === 1 ? `${packageItem.duration} ${t('day')}` : `${packageItem.duration} ${t('days')}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" className="info-box">
                                <FitnessCenterIcon className="luDumbbell-icon" />
                                {packageItem.level}
                            </Typography>
                        </Box>
                    </CardContent>
                </Grid>
                <Divider orientation="vertical" flexItem className="vertical-divider" />
                <Grid item xs={3}>
                    <CardContent className="package-right-content">
                        <Box className="rating-container">
                            <Box className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} style={{ color: i < packageItem.ratings ? 'gold' : 'grey' }} />
                                ))}
                            </Box>
                            <Typography variant="body2" className="review-text">
                                {packageItem.ratings} / {packageItem.ratings} {t('reviews')}
                            </Typography>
                        </Box>
                        <Typography variant="h6" color="primary">${packageItem.newPrice.toFixed(2)}</Typography>
                        <Typography variant="body2" color="textSecondary" className="price-per-person">
                            {t('per_person')}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Button variant="contained" color="primary" size="small" className="tour-button" onClick={handleViewTourClick}>
                                {t('view_tour')}
                            </Button>
                            <IconButton 
                                onClick={handleShareClick} 
                                className="share-icon"
                                sx={{
                                    marginTop: '1rem',
                                    color: '#1976d2'
                                }}
                            >
                                <ShareIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default PackageCard;
