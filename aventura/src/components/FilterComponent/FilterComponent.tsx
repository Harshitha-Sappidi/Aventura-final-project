import React from 'react';
import { Box, Typography, Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './FilterComponent.scss';

interface FilterComponentProps {
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ filters, setFilters }) => {
    const { t } = useTranslation();

    const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
        setFilters({
            ...filters,
            [name]: newValue,
        });
    };

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setFilters({
            ...filters,
            [event.target.name as string]: event.target.value
        });
    };

    return (
        <Box className="filter-box">
            <Typography variant="h6">{t('filter_by')}</Typography>

            <Box className="filter-option">
                <Typography>{t('price')}</Typography>
                <Slider
                    value={filters.priceRange}
                    onChange={handleSliderChange('priceRange')}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000}
                />
                <Typography>
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Typography>
            </Box>

            <Box className="filter-option">
                <Typography>{t('days')}</Typography>
                <Slider
                    value={filters.daysRange}
                    onChange={handleSliderChange('daysRange')}
                    valueLabelDisplay="auto"
                    min={1}
                    max={30}
                />
                <Typography>
                    {filters.daysRange[0]} - {filters.daysRange[1]} Days
                </Typography>
            </Box>

            <Box className="filter-option">
                <Typography>{t('rating')}</Typography>
                <Slider
                    value={filters.rating}
                    onChange={handleSliderChange('rating')}
                    valueLabelDisplay="auto"
                    min={1}
                    max={5}
                />
                <Typography>
                    {filters.rating[0]} - {filters.rating[1]} Stars
                </Typography>
            </Box>

            <Box className="filter-option">
                <Typography>{t('destination')}</Typography>
                <Select
                    value={filters.destination}
                    onChange={handleSelectChange}
                    name="destination"
                    fullWidth
                >
                    <MenuItem value="All">{t('all')}</MenuItem>
                    <MenuItem value="Canada">{t('canada')}</MenuItem>
                    <MenuItem value="USA">{t('usa')}</MenuItem>
                    <MenuItem value="Brazil">{t('brazil')}</MenuItem>
                    <MenuItem value="Costa Rica">{t('costa_rica')}</MenuItem>
                </Select>
            </Box>

            <Box className="filter-option">
                <Typography>{t('difficulty_level')}</Typography>
                <Select
                    value={filters.difficulty}
                    onChange={handleSelectChange}
                    name="difficulty"
                    fullWidth
                >
                    <MenuItem value="All">{t('all')}</MenuItem>
                    <MenuItem value="Easy">{t('easy')}</MenuItem>
                    <MenuItem value="Moderate">{t('moderate')}</MenuItem>
                    <MenuItem value="Hard">{t('hard')}</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default FilterComponent;
