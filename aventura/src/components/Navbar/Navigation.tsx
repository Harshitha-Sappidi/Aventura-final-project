import React, {useEffect, useState} from 'react';
import {AppBar, Badge, Box, IconButton, Menu, MenuItem, Modal, Tab, Tabs, Toolbar, Typography} from '@mui/material';
import {assets} from '../../services/assets'; // Fixed import path (removed .ts extension)
import Header from '../Header/Header';
import AuthForm from "../Auth/AuthForm";
import SignUpForm from "../Auth/SignUpForm";
import {useNavigate} from "react-router-dom";
import {t} from 'i18next';
import {useDispatch, useSelector} from "react-redux";
import UserProfileModal from "../UserProfile/UserProfileModal";
import {deleteUser} from "../../store/slices/user-slice";
import {RootState} from '../../store';

interface NavigationProps {
}

interface NavigationProps {
    translatePage: () => void;
}

const Navigation: React.FC<NavigationProps> = ({translatePage}) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check if user is admin
    const [value, setValue] = useState(false); // Changed to number for Tabs value
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const user = useSelector((state: RootState) => state.user);
    const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from the state
    const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items

    // handle login click
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginPopUp, setIsLoginPopUp] = useState(false);
    const [isSignUpPopUp, setIsSignUpPopUp] = useState(false);
    const [isProfilePopUp, setIsProfilePopUp] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.isLoggedIn) {
            localStorage.setItem("user", JSON.stringify(user));
            setIsLogged(true);
        }
    }, [user.isLoggedIn]); // Add dependency array to only run on user.isLoggedIn change

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setIsHeaderVisible(false);
    };

    const onHomeClick = () => {
        navigate('/');
    };

    const handleLoginSuccess = () => {
        setIsLogged(true);
        setIsModalOpen(false);
    };

    const onUserAccountClick = () => {
        setIsModalOpen(true);
        setIsProfilePopUp(true);
    };

    const onMyOrdersClick = () => {
        navigate('/my-orders'); // Navigate to MyOrders page
    }
    const onLoginClick = () => {
        setIsModalOpen(true);
        setIsLoginPopUp(true);
    };

    const togglePages = () => {
        setIsLoginPopUp(!isLoginPopUp);
        setIsSignUpPopUp(!isSignUpPopUp);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Type for anchorEl

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const onCartClick = () => {
        navigate('/cart'); // Navigate to the cart page when the bag icon is clicked
    };

    return (
        <>
            {isHeaderVisible && <Header onClose={handleClose}/>}
            <AppBar position="absolute" sx={{
                bgcolor: 'transparent',
                boxShadow: 'none',
                borderBottom: '1px solid white',
                mt: isHeaderVisible ? '60px' : '0px'
            }}>
                <Toolbar sx={{margin: '10px'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1}} onClick={onHomeClick}>
                        <img src={assets.logo} width="60px" alt="Aventura Logo"/>
                        <Typography variant="h5" sx={{ml: 1, fontWeight: 'bold'}}>
                            {t("aventura")}
                        </Typography>
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <Tabs value={value} onChange={handleChange} centered sx={{
                            '& .MuiTab-root': {color: 'white'},
                            '& .MuiTabs-indicator': {backgroundColor: 'white'}
                        }}>
                            <Tab label={t("packages")} onClick={() => navigate('/packages')}/>
                            <Tab label={t("shop")} onClick={() => navigate('/products')}/>
                            <Tab label={t("blogs")} onClick={() => navigate('/blogs')}/>
                            {isAdmin && <Tab label={t("Dashboard")} onClick={() => navigate('/dashboard')}/>}
                        </Tabs>
                    </Box>
                    <Box sx={{display: 'flex', gap: 2, ml: 2}}>
                        {isLogged ? (
                            <IconButton color="inherit" onClick={onCartClick}>
                                <Badge badgeContent={totalItemsInCart} color="primary">
                                    <img src={assets.bag} alt="cart" style={{width: '30px', height: '30px'}}/>
                                </Badge>
                            </IconButton>
                        ) : null}
                        <IconButton color="inherit" onClick={translatePage}>
                            <img src={assets.language_change} alt="language" style={{width: '30px', height: '30px'}}/>
                        </IconButton>
                        {!isLogged ? (
                            <IconButton color="inherit" onClick={onLoginClick}>
                                <img src={assets.user_profile} alt="user profile"
                                     style={{width: '30px', height: '30px'}}/>
                            </IconButton>
                        ) : (
                            <>
                                <IconButton color="inherit" onClick={handleClick}>
                                    <img src={assets.user_profile} alt="user profile"
                                         style={{width: '30px', height: '30px'}}/>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem onClick={onUserAccountClick}>{t("user_account")}</MenuItem>
                                    <MenuItem onClick={() => navigate('/my-bookings')}>My Bookings</MenuItem> {/* Add this */}
                                    <MenuItem onClick={() => {
                                        setIsLogged(false);
                                        dispatch(deleteUser());
                                        handleCloseMenu();
                                        setIsProfilePopUp(false);
                                        localStorage.removeItem('user');
                                        localStorage.removeItem('isAdmin');
                                    }}>{t('Logout')}</MenuItem>
                                </Menu>
                            </>
                        )}
                        <Modal
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        >
                            {isProfilePopUp ? (
                                <UserProfileModal open={isModalOpen} closeModel={closeModal}/>
                            ) : isLoginPopUp ? (
                                <AuthForm
                                    navigateToSignUp={togglePages}
                                    onLoginSuccess={handleLoginSuccess}
                                    closeModel={closeModal}
                                />
                            ) : (
                                <SignUpForm
                                    navigateToLogin={togglePages}
                                    closeModel={closeModal}
                                />
                            )}
                        </Modal>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navigation;
