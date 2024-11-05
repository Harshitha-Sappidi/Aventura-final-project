import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cart-slice';
import { Package } from '../../models/package';
import './BookingForm.scss';
import { t } from 'i18next';

interface BookingFormProps {
    packageDetails: Package;
}

const BookingForm: React.FC<BookingFormProps> = ({ packageDetails }) => {
    const [numPersons, setNumPersons] = useState<number>(1);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number>(packageDetails.newPrice);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [alertSeverity, setAlertSeverity] = useState<"success" | "warning">("success");
    const dispatch = useDispatch();

    const handleNumPersonsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumPersons = parseInt(event.target.value);
        setNumPersons(newNumPersons);
        setTotalPrice(newNumPersons * packageDetails.newPrice);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleBooking = () => {
        const today = new Date();
        const selectedDateObj = new Date(selectedDate);

        if (!selectedDate) {
            setNotificationMessage('Please select a date.');
            setAlertSeverity("warning");
            setOpenSnackbar(true);
            return;
        }

        if (selectedDateObj < today) {
            setNotificationMessage('Please choose a future date.');
            setAlertSeverity("warning");
            setOpenSnackbar(true);
            return;
        }

        // Add the package to the cart
        const cartItem = {
            _id: packageDetails.id,
            name: packageDetails.title,
            price: packageDetails.newPrice,
            quantity: numPersons,
            availableQuantity: 10,  // Assuming a default available quantity
            image: packageDetails.cardImage,  // Assuming packageDetails has a cardImage property
            type: 'package',  // Indicate that this is a package
        };
        dispatch(addToCart(cartItem));

        // Handle the booking logic if the date is valid
        setNotificationMessage(t("booking_confirmed"));
        setAlertSeverity("success");
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box className="booking-form">
            <Typography variant="h5" sx={{ color: 'white' }}>{t("book_tour")}</Typography>
            <TextField
                type="number"
                value={numPersons}
                onChange={handleNumPersonsChange}
                InputProps={{
                    inputProps: { min: 1 },
                    disableUnderline: true
                }}
                fullWidth
                margin="normal"
                sx={{ backgroundColor: 'white' }}
            />
            <TextField
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: 'white' }}
            />
            <Typography className="price-summary">
                {numPersons} x ${packageDetails.newPrice} = ${totalPrice.toFixed(2)}
            </Typography>
            <Box className="book-now-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBooking}
                    fullWidth
                    className="book-now-button"
                >
                    {t("book_now")}
                </Button>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    action={
                        <Button color="inherit" onClick={handleCloseSnackbar}>
                            Close
                        </Button>
                    }
                    sx={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
                        {notificationMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default BookingForm;
