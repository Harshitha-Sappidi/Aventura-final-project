import React, {useState} from 'react';
import {Box, Button, IconButton, TextField, Typography} from '@mui/material';
import {GoogleLogin} from "@react-oauth/google";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useNavigate} from "react-router-dom";
import {assets} from '../../services/assets.ts';
import {useDispatch} from "react-redux";
import {IUser} from "../../models/user.ts";
import {deleteUser, saveUser} from "../../store/slices/user-slice.ts";
import {loginUser, registerUserWithGoogle} from "../../services/authService.ts";
import {useTranslation} from "react-i18next";


interface AuthFormProps {
    navigateToSignUp: () => void;
    onLoginSuccess: () => void;
    closeModel: () => void;
}

const initialStateUser = {
    email: '',
    password: ''
};


const AuthForm: React.FC<AuthFormProps> = ({
                                               navigateToSignUp,
                                               onLoginSuccess,
                                               closeModel
                                           }) => {

    const { t } = useTranslation('common');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState<IUser>(initialStateUser);
    const [error, setError] = useState<string | null>(null);


    const errorMessage = (error: any) => {
        console.log("Google login error:", error);
        // Handle login error here
        // For example, you can show an error message to the user
    };

    const login = async () => {
        try {
            const validatedUser = await loginUser(user.email, user.password);
            setError(null);
            localStorage.setItem("user", JSON.stringify(validatedUser));
            dispatch(saveUser(validatedUser));
            alert("Login successful");
    
            // Check if the user is an admin
            if (validatedUser.user.email === 'admin@gmail.com') {
                localStorage.setItem('isAdmin', 'true');
            } else {
                localStorage.removeItem('isAdmin');
            }
    
            onLoginSuccess();
        } catch (error) {
            dispatch(deleteUser());
            console.error(`Error logging in: ${error}`);
            setError('Invalid username or password');
        }
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isValid = true;


        const data = new FormData(event.currentTarget);


        setUser({
            ...user,
            email: String(data.get('email')),
            password: String(data.get('password')),
        });
        login();
        navigate('/');
    };


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
                <Typography variant="h5" sx={{mb: 3, fontWeight: 'bold'}}>{t("login_heading_p1")}<br/>
                    {t("login_heading_p2")}</Typography>
                <IconButton
                    color="inherit"
                    onClick={closeModel}
                    sx={{position: 'absolute', top: 10, right: 10}}
                >
                    <img src={assets.black_cross} alt="close"
                         style={{width: '25px', height: '25px', color: 'black'}}/>
                </IconButton>
                <Box component="form" noValidate onSubmit={handleSubmit}>

                    <TextField
                        fullWidth margin="normal"
                        required
                        id="email"
                        label={t("email_address")}
                        name="email"
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t("password")}
                        type="password"
                        id="password"
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />


                    < Button fullWidth variant="contained" type="submit"
                             sx={{mt: 2, mb: 2, bgcolor: 'rgb(128, 255, 0)', color: 'black'}}>{t("login_btn")}
                    </Button>

                    <Button fullWidth variant="contained" sx={{mb: 1, bgcolor: '#4285f4'}}>
                        <GoogleLogin
                            onSuccess={async (responseMessage) => {

                                const idToken = responseMessage.credential;
                                console.log("Google login response:", idToken);
                                const res = await registerUserWithGoogle(idToken);
                                localStorage.setItem("user", JSON.stringify(res));
                                dispatch(saveUser(res));
                                onLoginSuccess()
                            }}
                            onError={errorMessage}
                            render={renderProps => (
                                <span onClick={renderProps.onClick} disabled={renderProps.disabled}
                                      style={{display: 'none'}}></span>
                            )}
                        />
                    </Button>

                    <Typography variant="body2">
                        {t("login_question")}
                        <a href="#" onClick={navigateToSignUp} style={{color: 'black'}}>{t("sign_up_link")}
                        </a>
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
}

export default AuthForm;
