import React, {useState} from 'react';
import {Box, Button, IconButton, TextField, Typography} from '@mui/material';
import {assets} from '../../services/assets.ts';
import {createUser} from "../../services/authService.ts";
import {useTranslation} from "react-i18next";

interface SignUpFormProps {
    navigateToLogin: () => void;
    closeModel: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({navigateToLogin, closeModel}) => {

    const { t } = useTranslation('common');

    const [userName, setUserName] = useState('username');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setPasswordError('');

        if (!firstName) {
            setFirstNameError('First name is required.');
            isValid = false;
        }

        if (!lastName) {
            setLastNameError('Last name is required.');
            isValid = false;
        }

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            isValid = false;
        }

        if (!isValid) return;

        registeruser();
    }
    const registeruser = async () => {
        try {
            await createUser(userName, firstName, lastName, email, password);
            alert("User registered successfully")
            closeModel();
        } catch (err) {
            console.log(err);
            alert("Invalid email or password");
        }
    }

    return (
        <Box sx={{
            height: '85vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background-image 0.5s linear',
        }}>
            <Box sx={{
                width: '350px',
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                position: 'relative'
            }}>
                <IconButton sx={{position: 'absolute', top: 10, left: 10}} onClick={navigateToLogin}>
                    <img src={assets.back_icon} alt="Back" style={{width: '24px', height: '24px'}}/>
                </IconButton>
                <img src={assets.logo} alt="Aventura Logo" style={{width: '80px', marginBottom: '20px'}}/>
                <Typography variant="h6" sx={{mb: 3}}>
                    {t("heading_p1")} <br/> {t("heading_p2")}
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={closeModel}
                    sx={{position: 'absolute', right: 0, top: 0}}
                >
                    <img src={assets.black_cross} alt="close" style={{position: 'absolute', top: 10, right: 10}}/>
                </IconButton>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label={t("firstName")}
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={!!firstNameError}
                        helperText={firstNameError}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label={t("lastName")}
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!lastNameError}
                        helperText={lastNameError}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label={t("email_address")}
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label={t("password")}
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 2, mb: 2, bgcolor: 'rgb(128, 255, 0)', color: 'black'}}
                    >
                        {t("sign_up_btn")}
                    </Button>
                </form>
                <Typography variant="body2">
                    {t("question")} <a href="#" onClick={navigateToLogin} style={{color: 'black'}}>{t("login_link")}</a>
                </Typography>
            </Box>
        </Box>
    );
}

export default SignUpForm;
