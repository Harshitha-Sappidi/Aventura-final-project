import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { Typography, Card, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function CartSummary() {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();
  
    const handleCartClick = () => {
      navigate('/cart');
    };
  
    return (
      <Card style={styles.cartSummaryCard} onClick={handleCartClick}>
        <CardContent style={styles.cardContent}>
          <Typography variant="h6" style={styles.cartTitle}>CART</Typography>
          <div style={styles.separator}></div>
          {cartItems.length > 0 ? (
            <Typography>{cartItems.length} products in the cart.</Typography>
          ) : (
            <div style={styles.noProductsContainer}>
              <ArrowForwardIcon style={styles.arrowIcon} />
              <Typography>No products in the cart.</Typography>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    cartSummaryCard: {
      cursor: 'pointer',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      transition: '0.3s',
      margin: '16px',
    },
    cardContent: {
      padding: '16px',
    },
    cartTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    separator: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      margin: '8px 0',
      position: 'relative',
    },
    noProductsContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
    },
    arrowIcon: {
      color: 'blue',
      marginRight: '8px',
    },
  };
  
  export default CartSummary;
  
  