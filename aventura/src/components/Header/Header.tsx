import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { assets } from '../../services/assets';
import { useTranslation } from "react-i18next";


interface HeaderProps {
  onClose: () => void;
}


const Header: React.FC<HeaderProps> = ({ onClose }) => {
  const { t } = useTranslation('common');
  return (
    <Box sx={{ position: 'relative' }}>
      <AppBar position="relative" sx={{ bgcolor: 'crimson', height: '48px' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
          <Typography variant="body2">
            {t("best_current_deals")}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            {t("deals_of_the_week")}: {t("hiking_and_trekking")}
            <IconButton color="inherit" size="small" sx={{ ml: 1 }} onClick={onClose}>
              <img src={assets.cross} alt="close" style={{ width: '20px', height: '20px' }} />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
