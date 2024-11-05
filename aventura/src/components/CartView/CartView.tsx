import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeFromCart, updateCartItemQuantity, clearCart } from '../../store/slices/cart-slice';
import { Typography, Button, List, ListItem, ListItemText, IconButton, Box, Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import './CartView.scss';

import { useTranslation } from 'react-i18next';

const CartView = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Use translation hook

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId: string, quantity: number, availableQuantity: number) => {
    if (quantity < availableQuantity) {
      dispatch(updateCartItemQuantity({ productId, quantity: quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (productId: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ productId, quantity: quantity - 1 }));
    }
  };

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Separate adventure items (packages) from essentials
  const adventureItems = cartItems.filter(item => item.type === 'package');
  const essentialItems = cartItems.filter(item => item.type !== 'package');

  return (
    <div className="cart-view">

      <Typography variant="h3" className="cart-title">{t("cart")}</Typography>
      {/* <Box className="cart-section">
        <Typography variant="h5">{t("packages")}</Typography>
        <div className="cart-section-items">
          
        </div>
      </Box> */}
      <hr className="cart-separator" />
      <Box className="cart-section essentials-section">
        <Typography variant="h5">{t("packages")}</Typography>

        <List className="cart-section-items">
          {adventureItems.map((item) => (
            <ListItem key={item._id} className="list-item">
              <Box className="cart-item-image-container">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <Badge badgeContent={item.quantity} color="primary" className="cart-item-badge"></Badge>
              </Box>
              <Box className="product-details">
                <ListItemText primary={item.name} secondary={`$${item.price}`} />
                <Typography className="product-total">{t("total")}: ${(item.price * item.quantity).toFixed(2)}</Typography>
              </Box>
              <Box display="flex" alignItems="center" className="quantity-control">
                <IconButton onClick={() => handleDecreaseQuantity(item._id, item.quantity)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => handleIncreaseQuantity(item._id, item.quantity, item.availableQuantity)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => handleRemove(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <hr className="cart-separator" />

      {/* Essentials Section */}
      <Box className="cart-section essentials-section">
        <Typography variant="h5">{t("essentials")}</Typography>
        <List className="cart-section-items">
          {essentialItems.map((item) => (
            <ListItem key={item._id} className="list-item">
              <Box className="cart-item-image-container">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <Badge badgeContent={item.quantity} color="primary" className="cart-item-badge"></Badge>
              </Box>
              <Box className="product-details">
                <ListItemText primary={item.name} secondary={`$${item.price}`} />
                <Typography className="product-total">Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
              </Box>
              <Box display="flex" alignItems="center" className="quantity-control">
                <IconButton onClick={() => handleDecreaseQuantity(item._id, item.quantity)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => handleIncreaseQuantity(item._id, item.quantity, item.availableQuantity)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => handleRemove(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography variant="h6">{t("total_items")}: {totalCartQuantity}</Typography>
        <Typography variant="h6">{t("total_price")}: ${totalCartPrice.toFixed(2)}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" onClick={() => dispatch(clearCart())} className="clear-button">
          {t("clear_cart")}
        </Button>
      </Box>
    </div>
  );
};

export default CartView;


