import React from 'react';
import { Box, Button, Typography, Fade } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createOrder } from '../../services/order-service'; 
import { OrderItem } from '../../models/order'; 
import emailjs from '@emailjs/browser';

interface PaymentSectionProps {
  totalAmount: number;
  onSuccess: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ totalAmount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.user); 

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('CardElement not found');
      return;
    }

    try {
      const items: OrderItem[] = cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        type: item.type === 'package' ? 'package' : 'essentials'
      }));

      console.log('Order Items:', items);

      // Step 2: Post the order to the backend using createOrder
      const orderData = {
        userId : user?._id,
        email: user?.email,
        items,
        totalAmount,
        status: 'pending',
        createdAt: new Date()
      };

      const orderResponse = await createOrder(orderData);

      if (orderResponse) {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        const user = parsedData.user; // Ensure correct structure
        if (user && user.email) {
            console.log('User email:', user.email);
            const templateParams = {
              email: user.email,
              totalAmount: `$${totalAmount.toFixed(2)}`,
              orderDate: new Date().toLocaleDateString(),
            };
  
            emailjs.send(
              'service_z1nlno4', 
              'template_kmiembm', 
              templateParams,
              'KuGaxokCxwOoF7Kbc'
            ).then((result) => {
              console.log('Email sent successfully:', result.text);
            }).catch((error) => {
              console.error('Failed to send email:', error);
            });
        } else {
            console.error('User data is invalid or missing email:', user);
        }
        } else {
        console.error('No user data found in localStorage');
        }

        onSuccess(); // Call the success handler if order creation is successful
      } else {
        console.error('Order creation failed on server.');
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#32325d',
        iconColor: '#32325d',
      },
    },
  };

  return (
    <Fade in timeout={500}>
      <Box className="payment-section" sx={{
        marginTop: 4,
        padding: 3,
        borderRadius: 2,
        backgroundColor: '#f7f7f7',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', marginBottom: 2 }}>
          Payment Details
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', marginBottom: 2 }}>
          Total Price: ${totalAmount.toFixed(2)}
        </Typography>
        <Box sx={{
          padding: 2,
          borderRadius: 2,
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          marginBottom: 3,
        }}>
          <CardElement options={cardElementOptions} />
        </Box>
        <Button
          onClick={handlePaymentSubmit}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
          disabled={!stripe}
          sx={{
            padding: 1.5,
            fontSize: '1rem',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Pay ${totalAmount.toFixed(2)}
        </Button>
      </Box>
    </Fade>
  );
};

export default PaymentSection;
