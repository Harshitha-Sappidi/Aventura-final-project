import React from 'react';
import { Box, Grid } from '@mui/material';
import Cart from '../../components/CartView/CartView';
import AddressForm from '../../components/AddressForm/AddressForm';
import './CartPage.scss';
import Navigation from '../../components/Navbar/Navigation';
import HeroSection from '../../components/HeroSection/HeroSection';
import backgroundImage from '../../assets/images/shoppingcart.jpg';
import Footer from '../../components/Footer/Footer';

const CartPage = () => {
  return (
    <>
    <Navigation/>
    <HeroSection 
          searchTerm={''} 
          setSearchTerm={(String)} 
          showSearch={false} 
          imageUrl={backgroundImage} 
          title={"Your adventure begins with a single step. Every item in your cart brings you closer to a journey worth taking."}
      />
    <Box className="cart-page">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} className="payment-container">
          <AddressForm />
        </Grid>
        <Grid item xs={12} md={6} className="full-height-cart">
          <Cart />
        </Grid>
      </Grid>
    </Box>
    <Footer/>
    </>
    
  );
};

export default CartPage;
