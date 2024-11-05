import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import { Product } from '../../models/shop';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductCard.scss';

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use translation hook

  const handleViewClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card className="card-shop">
      <Box className="imageContainer">
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          className="media"
        />
      </Box>
      <Box className="pt-shop">
        {`$${product.price}`}
      </Box>
      <Box className="separator"></Box>
      <CardContent className="cardContent">
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="description">
          {product.description}
        </Typography>
        <Box className="transparentLine"></Box>
        <Button size="small" color="primary" onClick={handleViewClick}>
          {t('view')}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
