import React from 'react';
import { Box, Typography, Grid, Chip, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Package } from '../../models/package';
import './DetailsTab.scss';
import { t } from 'i18next';

interface DetailsTabProps {
    details: Package;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ details }) => {
    return (
        <Box className="details-tab">
            <Grid container spacing={2} className="tab-header">
                <Grid item xs={2.3} className="tab-item">
                    <Box className="icon-text-container">
                        <AccessTimeIcon className="icon" />
                        <Box>
                            <Typography variant="subtitle1" className="header-text">{details.duration} {t("days")}</Typography>
                            <Typography variant="body2" className="sub-text">{t("duration")}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem className="side-divider" />
                <Grid item xs={2.3} className="tab-item">
                    <Box className="icon-text-container">
                        <FitnessCenterIcon className="icon" />
                        <Box>
                            <Typography variant="subtitle1" className="header-text">{details.physicality}</Typography>
                            <Typography variant="body2" className="sub-text">{t("physicality")}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem className="side-divider" />
                <Grid item xs={2.3} className="tab-item">
                    <Box className="icon-text-container">
                        <LocationOnIcon className="icon" />
                        <Box>
                            <Typography variant="subtitle1" className="header-text">{details.destination.city}</Typography>
                            <Typography variant="body2" className="sub-text">{t("location")}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem className="side-divider" />
                <Grid item xs={2.3} className="tab-item">
                    <Box className="icon-text-container">
                        <PersonIcon className="icon" />
                        <Box>
                            <Typography variant="subtitle1" className="header-text">{details.details.age}+</Typography>
                            <Typography variant="body2" className="sub-text">{t("age")}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem className="side-divider" />
                <Grid item xs={2.5} className="tab-item">
                    <Box className="icon-text-container">
                        <EventIcon className="icon" />
                        <Box>
                            <Typography variant="subtitle1" className="header-text">{details.details.availability}</Typography>
                            <Typography variant="body2" className="sub-text">{t("dates")}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Divider className="divider" />

            <Box className="chip-container">
                {details.details.essentials.map((essential) => (
                    <Chip key={essential} label={essential} className="detail-chip" />
                ))}
            </Box>

            <Typography variant="body1" className="detail-description">
                {details.details.detailDescription}
            </Typography>

            <Divider className="divider" />

            <Box className="additional-info">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} className="info-label">
                        <Typography variant="h6">{t("departure_return_location")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="body2">{details.details.departureLocation}</Typography>
                    </Grid>
                </Grid>

                <Divider className="divider" />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} className="info-label">
                        <Typography variant="h6">{t("departure_time")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="body2">{details.details.departureTiming}</Typography>
                    </Grid>
                </Grid>

                <Divider className="divider" />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} className="info-label">
                        <Typography variant="h6">{t("essentials")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Grid container spacing={2}>
                            {details.details.essentials.map((item) => (
                                <Grid item xs={6} key={item} className="info-item">
                                    <RadioButtonCheckedIcon className="essential-icon" />
                                    <Typography variant="body2">{item}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Divider className="divider" />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} className="info-label">
                        <Typography variant="h6">{t("included")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Grid container spacing={2}>
                            {details.details.included.map((item) => (
                                <Grid item xs={6} key={item} className="info-item">
                                    <DoneIcon className="included-icon" />
                                    <Typography variant="body2">{item}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Divider className="divider" />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} className="info-label">
                        <Typography variant="h6">{t("not_included")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Grid container spacing={2}>
                            {details.details.notIncluded.map((item) => (
                                <Grid item xs={6} key={item} className="info-item">
                                    <CloseIcon className="not-included-icon" />
                                    <Typography variant="body2">{item}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DetailsTab;
