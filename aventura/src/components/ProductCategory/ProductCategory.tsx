import React from 'react';
import { Typography, Box, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductCategory.scss'; 

interface ProductCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const ProductCategories = ({ selectedCategory, onSelectCategory }: ProductCategoriesProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    navigate(`/products?category=${category}`);
  };

  const categories = [
    'All',
    'Tents',
    'Footwear',
    'Clothing',
    'Backpacks',
    'Lighting',
    'Cooking Equipment',
    'Hydration',
    'Safety',
    'Sleeping Gear'
  ];

  return (
    <Box className="product-categories">
      <Typography variant="h6" className="categories-title">{t('product_categories')}</Typography>
      <Box className="categories-separator" my={2}></Box>
      <List className="categories-list">
        {categories.map((category) => (
          <ListItem
            button
            key={category}
            className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
            onMouseOver={(event) => (event.currentTarget.style.color = '#3f51b5')}
            onMouseOut={(event) => (event.currentTarget.style.color = selectedCategory === category ? '#3f51b5' : 'rgba(0, 0, 0, 0.87)')}
            disableGutters
          >
            {t(category.toLowerCase().replace(' ', '_'))}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProductCategories;
