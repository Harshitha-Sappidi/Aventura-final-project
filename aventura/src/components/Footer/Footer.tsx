import React from 'react';
import { Box, Typography, Grid, Link, List, ListItem, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import './Footer.scss';
import { t } from 'i18next';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box component="footer" className="footer">
      <Grid container spacing={2} className="footerContainer">
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className="footerTitle">{t("about_us")}</Typography>
          <Typography variant="body2" className="footerText">
            {t("about_us_description")}
          </Typography>
          <img src="/src/assets/travel-award-2023.svg" alt="Travel Awards 2023" className="awardImage"/>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className="footerTitle">EXPLORE ACTIVITY</Typography>
          <List>
            {[t('hiking'), t('cycling'), t('trekking'), t('snow_sports'), t('mountain_biking'), t('running')].map((activity) => (
              <ListItem key={activity} className="footerListItem">
                <Link href={`/${activity.toLowerCase().replace(' ', '-')}`} className="footerLink">
                  {activity}
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className="footerTitle">{t("latest_tweets")}</Typography>
          <Typography variant="body2" className="footerText">
            {t('latest_tweets_description')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className="footerTitle">{t("contact_us")}</Typography>
          <Typography variant="body2" className="contactItem">
            <LocationOnIcon /> {t("address")}
          </Typography>
          <Typography variant="body2" className="contactItem">
            <PhoneIcon /> <Link href="tel:+14202406000" className="contactLink">{t("phone")}</Link>
          </Typography>
          <Typography variant="body2" className="contactItem">
            <EmailIcon /> <Link href="mailto:contact@adventuretours.com" className="contactLink">{t("email")}</Link>
          </Typography>
        </Grid>
      </Grid>
      
      <Box className="footerHighlights">
        <Grid container spacing={2} className="footerHighlightsContainer">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footerHighlightsTitle">{t("app_for_outdoors")}</Typography>
            <Box className="appButtons">
              <img src="/src/assets/apple-app-store.svg" alt="Download on the App Store" className="appStoreImage"/>
              <img src="/src/assets/google-play-store.svg" alt="Get it on Google Play" className="appStoreImage"/>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footerHighlightsTitle">{t("members_for_planet")}</Typography>
            <Box className="memberLogos">
              <img src="/src/assets/oneprecentplanet.png" alt="1% for the Planet" className="memberLogo largeMemberLogo"/>
              <img src="/src/assets/leavenotrace.png" alt="Leave No Trace" className="memberLogo largeMemberLogo"/>
              <img src="/src/assets/onetreeplanted.png" alt="One Tree Planted" className="memberLogo largeMemberLogo"/>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="footerHighlightsTitle">{t("connect_with_us")}</Typography>
            <Box className="socialIcons">
              <InstagramIcon />
              <FacebookIcon />
              <XIcon />
              <LinkedInIcon />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="footerBottom">
        <IconButton onClick={scrollToTop} className="scrollToTopButton">
          <ArrowUpwardIcon />
        </IconButton>
        <Box className="footerBottomContent">
          <img src="/src/assets/aventura-transparent.svg" alt="Aventura Logo" className="aventuraLogo" />
          <Typography variant="body2" className="footerRights">
            <CopyrightRoundedIcon className="copyrightIcon"/> {t("copyright")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
