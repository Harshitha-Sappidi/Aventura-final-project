import { useState } from 'react';
import { Box, Button, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DetailsTab from '../DetailsTab/DetailsTab';
import ItineraryTab from '../ItineraryTab/ItineraryTab';
import LocationTab from '../LocationTab/LocationTab';
import PhotosTab from '../PhotosTab/PhotosTab';
import WeatherTab from '../WeatherTab/WeatherTab';
import { Package } from '../../models/package';
import './TabSection.scss';

interface TabsSectionProps {
    packageDetails: Package;
}

const TabsSection: React.FC<TabsSectionProps> = ({ packageDetails }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<string | null>('details'); // Updated state to allow null
    const isMobile = useMediaQuery('(max-width:600px)'); // Detect if the screen is mobile

    const handleTabChange = (tab: string) => {
        // Toggle the active tab or close it if the same tab is clicked again
        setActiveTab(prevTab => (prevTab === tab ? null : tab));
    };

    return (
        <Box className="tabs-section">
            {isMobile ? (
                <>
                    <Accordion expanded={activeTab === 'details'} onChange={() => handleTabChange('details')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="details-content">
                            {t('details')}
                        </AccordionSummary>
                        <AccordionDetails>
                            <DetailsTab details={packageDetails} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={activeTab === 'itinerary'} onChange={() => handleTabChange('itinerary')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="itinerary-content">
                            {t('itinerary')}
                        </AccordionSummary>
                        <AccordionDetails>
                            <ItineraryTab itinerary={packageDetails} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={activeTab === 'location'} onChange={() => handleTabChange('location')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="location-content">
                            {t('location')}
                        </AccordionSummary>
                        <AccordionDetails>
                            <LocationTab coordinates={packageDetails.destination.coordinates} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={activeTab === 'photos'} onChange={() => handleTabChange('photos')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="photos-content">
                            {t('photos')}
                        </AccordionSummary>
                        <AccordionDetails>
                            <PhotosTab images={packageDetails} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={activeTab === 'weather'} onChange={() => handleTabChange('weather')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="weather-content">
                            {t('weather')}
                        </AccordionSummary>
                        <AccordionDetails>
                            <WeatherTab coordinates={packageDetails.destination.coordinates} />
                        </AccordionDetails>
                    </Accordion>
                </>
            ) : (
                <>
                    <Box className="tabs-buttons">
                        <Button
                            variant={activeTab === 'details' ? 'contained' : 'outlined'}
                            onClick={() => handleTabChange('details')}
                            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                        >
                            {t('details')}
                        </Button>
                        <Button
                            variant={activeTab === 'itinerary' ? 'contained' : 'outlined'}
                            onClick={() => handleTabChange('itinerary')}
                            className={`tab-button ${activeTab === 'itinerary' ? 'active' : ''}`}
                        >
                            {t('itinerary')}
                        </Button>
                        <Button
                            variant={activeTab === 'location' ? 'contained' : 'outlined'}
                            onClick={() => handleTabChange('location')}
                            className={`tab-button ${activeTab === 'location' ? 'active' : ''}`}
                        >
                            {t('location')}
                        </Button>
                        <Button
                            variant={activeTab === 'photos' ? 'contained' : 'outlined'}
                            onClick={() => handleTabChange('photos')}
                            className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
                        >
                            {t('photos')}
                        </Button>
                        <Button
                            variant={activeTab === 'weather' ? 'contained' : 'outlined'}
                            onClick={() => handleTabChange('weather')}
                            className={`tab-button ${activeTab === 'weather' ? 'active' : ''}`}
                        >
                            {t('weather')}
                        </Button>
                    </Box>
                    <Box className="tab-content">
                        {activeTab === 'details' && <DetailsTab details={packageDetails} />}
                        {activeTab === 'itinerary' && <ItineraryTab itinerary={packageDetails} />}
                        {activeTab === 'location' && <LocationTab coordinates={packageDetails.destination.coordinates} />}
                        {activeTab === 'photos' && <PhotosTab images={packageDetails} />}
                        {activeTab === 'weather' && <WeatherTab coordinates={packageDetails.destination.coordinates} />}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TabsSection;
