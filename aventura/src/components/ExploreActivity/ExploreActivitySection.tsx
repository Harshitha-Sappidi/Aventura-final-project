import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {assets} from '../../services/assets';
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)(({theme}) => ({

    maxWidth: 345,
    margin: '25px',
    borderRadius: '0',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1)',
    },
    '&:hover .explore-button': {
        transform: 'translateY(0)',
        opacity: 1,
    },
    '&:hover .card-media': {
        transform: 'scale(1.1)',
    },
}));

const StyledCardMedia = styled(CardMedia)(({theme}) => ({
    transition: 'transform 0.3s ease-in-out',
}));

const ExploreButton = styled(Button)(({theme}) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '12px',
    borderRadius: '0px',
    transform: 'translateY(100%)',
    opacity: 0,
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    '&:hover': {
        backgroundColor: '#000000',
    },
}));

const ExploreActivitySection: React.FC = () => {
    const { t } = useTranslation('common');
    const activities = [
        {name: t('camping'), image: assets.camping},
        {name: t('running'), image: assets.running},
        {name: t('hiking'), image: assets.hiking},
        {name: t('climbing'), image: assets.climbing},
    ];

    const navigate = useNavigate();

    return (
        <Box sx={{padding: '20px', backgroundColor: '#121212'}}>
            <Typography variant="h4" component="h2" style={{fontFamily: 'Archivo, sans-serif'}} gutterBottom
                        textAlign="center" color="white" margin="30px">
                {t("explore_by_activity")}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '50px', height: '4px', backgroundColor: '#007BFF' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 'calc(100% - 240px)', height: '1px', backgroundColor: '#ddd', marginBottom: '20px' }} />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap',m:'10px'}}>
                {activities.map((activity, index) => (
                    <StyledCard key={index}>
                        <StyledCardMedia
                            className="card-media"
                            component="img"
                            height="450"
                            image={activity.image}
                            alt={activity.name}
                            onClick={() => {
                                navigate('/packages')
                            }}
                        />
                        <CardContent sx={{padding: 0, '&:last-child': {paddingBottom: 0}}}>
                            <Typography
                                variant="h5"
                                component="h3"
                                style={{fontFamily: 'Archivo, sans-serif'}}
                                textAlign="center"
                                position="absolute"
                                color="white"
                                fontWeight="bold"
                                top="200px"
                                left="0"
                                right="0"
                            >
                                {activity.name}
                            </Typography>
                            <ExploreButton className="explore-button" variant="contained" fullWidth>
                                {t("explore_activity")}
                            </ExploreButton>
                        </CardContent>
                    </StyledCard>
                ))}
            </Box>
        </Box>
    );
};

export default ExploreActivitySection;