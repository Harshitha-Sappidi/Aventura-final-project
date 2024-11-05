import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Modal, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {assets} from "../../services/assets.ts";
import {IUser} from "../../models/user.ts";
import {updateUserByEmail} from "../../services/authService.ts";
import {useNavigate} from "react-router-dom";
import {saveUser} from "../../store/slices/user-slice.ts";
import { useTranslation } from "react-i18next";

interface UserProfileModalProps {
    open: boolean;
    closeModel: () => void;
}

const initialStateUser = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    userImage: '',
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({open, closeModel}) => {

    const { t } = useTranslation('common');


    const storedUser = useSelector((state) => state.user.user);
    const [user, setUser] = useState<IUser>(initialStateUser);
    const [profilePic, setProfilePic] = useState<string>(assets.user_profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (storedUser) {
            setUser(storedUser);
            setProfilePic(storedUser.userImage);
        }
        setProfilePic(storedUser?.userImage ? storedUser.userImage : profilePic);
    }, [storedUser]);

    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("image");
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setProfilePic(reader.result as string);
                setUser({...user, userImage: reader.result as string});
            };
        }
    };

    const update = async () => {
        try {
            const updatedUser = await updateUserByEmail(user.email, user);
            if (updatedUser) {
                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch(saveUser(updatedUser));
                alert("Profile updated successfully")
                closeModel();
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error(`Error updating user: ${error}`);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setUser({
            ...user,
            email: String(data.get('email')),
            password: String(data.get('password')),
        });
        update();
        closeModel();
    }

    return (
        <Modal
            open={open}
            onClose={closeModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={closeModel}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <img src={assets.black_cross} alt="close"
                         style={{width: '25px', height: '25px', color: 'black'}}/>
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {t("edit_profile")}
                </Typography>
                <Box
                    component="form"
                    sx={{mt: 2}}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div style={{position: 'relative', width: '100px', height: '100px',alignItems: 'center',margin:'auto'}}>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                backgroundColor: '#ccc',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                src={user.userImage ? user.userImage : profilePic}
                                alt="Profile"
                                style={{
                                    width: '90%',
                                    height: '90%',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <IconButton
                            color="primary"
                            aria-label="edit profile picture"
                            component="label"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                padding: 4,
                                border: '1px solid #ccc'
                            }}
                        >
                            <input hidden accept="image/*" type="file" onChange={handleProfilePicChange}/>
                            <PhotoCamera fontSize="small"/>
                        </IconButton>
                    </div>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label= {t("userName")}
                        autoFocus
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        id="userName"
                        name="userName"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label={t("firstName")}
                        value={user.firstName}
                        onChange={(e) => setUser({...user, firstName: e.target.value})}
                        id="firstName"
                        name="firstName"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label={t("lastName")}
                        value={user.lastName}
                        onChange={(e) => setUser({...user, lastName: e.target.value})}
                        id="lastName"
                        name="lastName"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label={t("phone")}
                        value={user.phone}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                        id="phone"
                        name="phone"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label={t("email_address")}
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        id="email"
                        name="email"
                        disabled
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, bgcolor: 'black', color: 'white'}}
                    >
                        {t("update")}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default UserProfileModal;