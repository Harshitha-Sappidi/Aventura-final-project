
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Button, MenuItem, Typography, Modal } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { clearCart } from '../../store/slices/cart-slice';
import PaymentSection from '../PaymentSection/PaymentSection';
import { Country, State  } from 'country-state-city';
import './AddressForm.scss';

const stripePromise = loadStripe('pk_test_51PmNEB01yJMKyUhfVKNy26hhqoTrSoBtQLob9beUyzQdm64OarEzVTbvbxh1Kkmr4ovsGeqsVSjMUSaRkv7zRTgk00SVIUzcMF');

const AddressForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'US', // default to USA
    phone: '',
    subscribe: false,
  });

  const [zipError, setZipError] = useState<string | null>(null); // State to hold ZIP code validation error
  const [states, setStates] = useState<State[]>(State.getStatesOfCountry('US')); // Initial states for USA
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the total price from the cart
  const totalCartPrice = useSelector((state: RootState) => 
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  // Check if there are any packages in the cart
  const hasPackages = useSelector((state: RootState) =>
    state.cart.items.some(item => item.type === 'package')
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name as string]: value,
    }));

    if (name === 'country') {
      const selectedCountry = value as string;
      const statesOfCountry = State.getStatesOfCountry(selectedCountry);
      setStates(statesOfCountry);
      setFormData(prevData => ({ ...prevData, state: '' })); // Reset state when country changes
    }
  };

  const validateZipCode = (zip: string): boolean => {
    return /^[0-9]{5}$/.test(zip); // Generalized validation: must be exactly 5 digits
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateZipCode(formData.zip)) {
      setZipError('Invalid ZIP code. Please enter exactly 5 digits.');
      return;
    }
    setZipError(null);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    dispatch(clearCart()); // Clear the cart after successful payment
  };

  const handleConfirm = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/packages');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="address-form" sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" style={{ marginTop: '16px' }}>Delivery</Typography>
      <TextField
        fullWidth
        required
        label="Country/Region"
        name="country"
        value={formData.country}
        onChange={handleChange}
        margin="normal"
        select
      >
        {['US', 'BR', 'CR', 'CA'].map(countryCode => {
          const country = Country.getCountryByCode(countryCode);
          return (
            <MenuItem key={country?.isoCode} value={country?.isoCode}>
              {country?.name}
            </MenuItem>
          );
        })}
      </TextField>
      <Box display="flex" gap="16px">
        <TextField
          fullWidth
          required
          label="First name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          margin="normal"
        />
      </Box>
      <TextField
        fullWidth
        label="Company (optional)"
        name="company"
        value={formData.company}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        required
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Apartment, suite, etc. (optional)"
        name="apartment"
        value={formData.apartment}
        onChange={handleChange}
        margin="normal"
      />
      <Box display="flex" gap="16px">
        <TextField
          fullWidth
          required
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          margin="normal"
          select
          disabled={!states.length} // Disable if no states available
        >
          {states.map(state => (
            <MenuItem key={state.isoCode} value={state.name}>
              {state.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          required
          error={Boolean(zipError)}
          helperText={zipError}
          label="ZIP code"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          margin="normal"
        />
      </Box>
      <TextField
        fullWidth
        label="Phone (optional)"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '16px' }}
      >
        Continue to Payment
      </Button>

      {showPayment && (
        <Elements stripe={stripePromise}>
          <PaymentSection totalAmount={totalCartPrice} onSuccess={handlePaymentSuccess} />
        </Elements>
      )}

      {/* Success Modal */}
      <Modal
        open={paymentSuccess}
        onClose={handleConfirm}
        aria-labelledby="payment-success-modal"
        aria-describedby="payment-success-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6" id="payment-success-modal">
            Order Placed Successfully!
          </Typography>
          {hasPackages && (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Your packages have been successfully purchased. More details will be sent to {formData.email}.
            </Typography>
          )}
          <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
            <Button variant="contained" color="secondary" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddressForm;

