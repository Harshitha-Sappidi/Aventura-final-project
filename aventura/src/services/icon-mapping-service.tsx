import React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import SurfingIcon from '@mui/icons-material/Surfing';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import HikingIcon from '@mui/icons-material/Hiking';
import ParaglidingIcon from '@mui/icons-material/Paragliding';
import PeopleIcon from '@mui/icons-material/People';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PetsIcon from '@mui/icons-material/Pets';
import PlaceIcon from '@mui/icons-material/Place';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccessibleIcon from '@mui/icons-material/Accessible';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';

const iconMapping: { [key: string]: React.ReactNode } = {
    DealsAndDiscounts: <WorkOutlineIcon />,
    MealsIncluded: <RestaurantIcon />,
    Sports: <SportsSoccerIcon />,
    USA: <EmojiFlagsIcon />,
    Watersport: <SurfingIcon />,
    WeatherDependent: <WbSunnyIcon />,
    Adventure: <HikingIcon />,
    GuidedTours: <FollowTheSignsIcon />,
    Canada: <PlaceIcon />,
    Wildlife: <PetsIcon />,
    Beach: <BeachAccessIcon />,
    Relaxation: <AccessibleIcon />,
    CostaRica: <PlaceIcon />,
    Accommodations: <HotelIcon />,
    AirfareIncluded: <FlightIcon />,
    Hiking: <HikingIcon />,
    AirRides: <ParaglidingIcon />,
    FamilyFriendly: <PeopleIcon />
};

export default iconMapping;
