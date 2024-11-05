import React from 'react';
import { Box, Typography } from '@mui/material';
import {Package} from '../../models/package';
import './ItineraryTab.scss';
import { t } from 'i18next';

interface ItineraryTabProps {
    itinerary: Package;
}

const ItineraryTab: React.FC<ItineraryTabProps> = ({ itinerary }) => {
    return (
        <Box className="itinerary-tab">
            {itinerary.itinerary.map((item, index) => (
                <Box key={index} className="itinerary-item">
                    <Box className="itinerary-circle-container">
                        <Box className="itinerary-circle">
                            <Typography className="itinerary-number">{index + 1}</Typography>
                        </Box>
                        {index !== itinerary.itinerary.length - 1 && <Box className="itinerary-line"></Box>}
                    </Box>
                    <Box className="itinerary-content">
                        <Typography variant="h6" className="itinerary-title">{t("day")} {index + 1}: {item.activityTitle}</Typography>
                        <Typography variant="body2" className="itinerary-description">{item.activityDescription}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ItineraryTab;
