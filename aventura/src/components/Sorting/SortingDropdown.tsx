import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../../pages/ShopView/shopView';

interface SortingDropdownProps {
    selectedOption: string;
    handleSortChange: (event: SelectChangeEvent) => void;
}

const SortingDropdown = ({ selectedOption, handleSortChange }: SortingDropdownProps) => {
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className="sorting-formControl">
            <InputLabel id="sorting-label">{t('sort_by')}</InputLabel>
            <Select
                labelId="sorting-label"
                value={selectedOption}
                onChange={handleSortChange}
                label={t('sort_by')}
                className="sorting-select"
            >
                <MenuItem value="default">{t('default_sorting')}</MenuItem>
                <MenuItem value="averageRating">{t('sort_by_best_rating')}</MenuItem>
                <MenuItem value="latest">{t('sort_by_latest')}</MenuItem>
                <MenuItem value="priceLowToHigh">{t('sort_by_price_low_to_high')}</MenuItem>
                <MenuItem value="priceHighToLow">{t('sort_by_price_high_to_low')}</MenuItem>
            </Select>
        </FormControl>
    );
}

export default SortingDropdown;
