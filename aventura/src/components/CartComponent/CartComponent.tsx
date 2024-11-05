import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { initializeCart } from '../../store/slices/cart-slice';
import { Typography, Card, CardContent, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './CartComponent.scss';

import { useTranslation } from 'react-i18next';
 
function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userEmail = useSelector((state: RootState) => state.cart.userEmail);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use translation hook
 
  useEffect(() => {
    if (userEmail) {
      dispatch(initializeCart());
    }
  }, [dispatch, userEmail]);
 
  const handleCartClick = () => {
    navigate('/cart');
  };
 
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
 
  return (
    <Card className="cart-card" onClick={handleCartClick}>
      <CardContent>
        <Typography variant="h6" className="cart-title">{t("cart")}</Typography>
        <div className="cart-separator"></div>
        {totalItems > 0 ? (
          <div className="cart-info">
            <Badge badgeContent={totalItems} color="primary">
              <ShoppingCartIcon className="cart-icon" />
            </Badge>
            <Typography>{totalItems} {t("products_in_the_cart")}</Typography>
          </div>
        ) : (
          <div className="no-products-container">
            <ArrowForwardIcon className="arrow-icon" />
            <Typography> No products in the cart.</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
 
export default Cart;