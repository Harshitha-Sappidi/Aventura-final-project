import React, { useState } from 'react';
import { Typography, Button, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Product } from '../../models/shop';
import { addToCart } from '../../store/slices/cart-slice';
import { RootState } from '../../store';
import './ProductDetails.scss';

interface ProductDetailProps {
  product: Product;
  averageRating: number;
}

const ProductDetail = ({ product, averageRating }: ProductDetailProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const existingCartItem = cartItems.find(item => item._id === product._id);

  const handleAddToCart = () => {
    const availableQuantity = product.quantity - (existingCartItem ? existingCartItem.quantity : 0);
    if (quantity > availableQuantity) {
      setError(`${t('only')} ${availableQuantity} ${t('items_left_in_stock')}`);
      return;
    }
    setError(null);
    dispatch(addToCart({ ...product, quantity, availableQuantity: product.quantity }));
  };

  return (
    <Box className="product-detail-shop" p={2}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box className="product-image">
            <img src={'/' + product.image} alt={product.name} style={{ width: '550%', height: 'auto' }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="product-info">
            <Typography variant="h5" gutterBottom>{product.name}</Typography>
            <Box className="product-rating" display="flex" alignItems="center" mb={2}>
              <span className="stars">
                {'★'.repeat(Math.floor(averageRating)) + '☆'.repeat(5 - Math.floor(averageRating))}
              </span>
              <Typography variant="subtitle2" className="rating_description" ml={1}>
                {averageRating.toFixed(2)} {t('based_on')} {product.reviewItems.length} {t('reviews')}
              </Typography>
            </Box>
            <Typography variant="body1" className="prd-description" mb={2}>
              {product.description}
            </Typography>
            <Box className="color-info" display="flex" alignItems="center" mb={2}>
              <Typography variant="subtitle2" className="meta-title">{t('color')}:</Typography>
              <Typography variant="body1" ml={1}>{product.colorOptions.join(', ')}</Typography>
            </Box>
            <Box className="product-add-to-cart" display="flex" alignItems="center" mb={2}>
              <Typography variant="h6" className="product-price">${product.price}</Typography>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: '50px', marginLeft: '8px', marginRight: '8px' }}
              />
              <Button
                variant="contained"
                className="add-to-cart-button"
                onClick={handleAddToCart}
                style={{ marginLeft: '16px' }}
              >
                + {t('add_to_cart')}
              </Button>
            </Box>
            {error && <Typography color="error">{error}</Typography>}
            <Box className="product-meta" mt={2}>
              <Box className="meta-item" display="flex" mb={1}>
                <Typography variant="subtitle2" className="meta-title">{t('sku')}:</Typography>
                <Typography variant="subtitle2" ml={1}>{product.sku || 'N/A'}</Typography>
              </Box>
              <Box className="meta-item" display="flex">
                <Typography variant="subtitle2" className="meta-title">{t('category')}:</Typography>
                <Typography variant="subtitle2" ml={1}>{product.category}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
