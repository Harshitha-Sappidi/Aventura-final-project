import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './SortComponent.scss';

interface SortComponentProps {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
}

const SortComponent: React.FC<SortComponentProps> = ({ sortBy, setSortBy }) => {
    const { t } = useTranslation();

    return (
        <Box className="sort-box">
            <FormControl fullWidth>
                <InputLabel>{t('sort_by')}</InputLabel>
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as string)}
                    label={t('sort_by')}
                >
                    <MenuItem value="default">{t('sort_default')}</MenuItem>
                    <MenuItem value="price-asc">{t('sort_price_asc')}</MenuItem>
                    <MenuItem value="price-desc">{t('sort_price_desc')}</MenuItem>
                    <MenuItem value="title-asc">{t('sort_title_asc')}</MenuItem>
                    <MenuItem value="title-desc">{t('sort_title_desc')}</MenuItem>
                    <MenuItem value="rating-asc">{t('sort_rating_asc')}</MenuItem>
                    <MenuItem value="rating-desc">{t('sort_rating_desc')}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SortComponent;
