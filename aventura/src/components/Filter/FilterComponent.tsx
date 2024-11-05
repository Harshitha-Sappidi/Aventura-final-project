import React from 'react';
import { Card, CardContent, Typography, Slider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../Filter/FilterComponent.scss';

interface FilterByPriceProps {
  priceRange: number[];
  onPriceChange: (newValue: number[]) => void;
}

function FilterByPrice({ priceRange, onPriceChange }: FilterByPriceProps) {
  const { t } = useTranslation(); // Use translation hook
  const [value, setValue] = React.useState<number[]>(priceRange);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onPriceChange(newValue as number[]);
  };

  return (
    <Card className="filter-by-price-card">
      <CardContent>
        <Typography variant="h6" className="filter-by-price-title">{t('filter_by_price')}</Typography>
        <div className="filter-by-price-separator"></div>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={10}
          max={1000}
          className="filter-by-price-slider"
        />
        <div className="filter-by-price-container">
          <Typography className="filter-by-price-text">
            {t('price')}: ${value[0]} — ${value[1]}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilterByPrice;
