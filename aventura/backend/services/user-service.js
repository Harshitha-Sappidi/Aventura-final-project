import User from '../models/user.js';
import bcrypt from 'bcrypt'; // command: npm install express mongoose bcrypt dotenv
import jwt from 'jsonwebtoken';
import {OAuth2Client} from 'google-auth-library';

// command: npm install express mongoose bcrypt dotenv


let activeRefreshTokens = [];

// Generate access token
const generateAccessToken = (user) => {
    return jwt.sign({id: user._id}, 'mySecretKey', {expiresIn: '2m'});
};

const ClIENT_ID = '859435051233-pfk8v358vpbbtsi8k1ce70sov0qmk8ks.apps.googleusercontent.com';
const client = new OAuth2Client(ClIENT_ID);

// Service function to create a new user
export async function createUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
        ...data,
        password: hashedPassword,
        phone: '',
        username: data.firstName + " " + data.lastName,
    });
    return user.save();
}

// Service function to find a user by email
export async function findUserByEmail(email) {
    const user = User.findOne({email});
    // change password to bycrypt
    return user;
}

// Service function to validate user password
export async function validatePassword(inputPassword, storedPassword) {
    // if both passwords match, return true no bcrypt
    return bcrypt.compare(inputPassword, storedPassword);

//     return bcrypt.compare(inputPassword, storedPassword);
}


// Generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({id: user._id}, 'myRefreshSecretKey');
};

export const login = async (user) => {
    const email = user.email;
    const foundUser = await User.findOne({email});
    // validate user password
    const validPassword = await validatePassword(user.password, foundUser.password);
    if (!foundUser) {
        throw new Error('User not found');
    }
    if (!validPassword) {
        throw new Error('Invalid password');
    }

    const refreshToken = generateRefreshToken(foundUser);
    activeRefreshTokens.push(refreshToken);
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    const accessToken = generateAccessToken(foundUser);
    return {user: foundUser, accessToken, refreshToken};
}

// Service function to update a user by email
// aventura/backend/services/user-service.js
export async function updateUserByEmail(data) {
    const email = data.email;
    const user = await User.findOne({email});
    if (!user) {
        return null;
    }

    return await User.findByIdAndUpdate(user._id, data, {new: true}).exec();
}

export async function googleLogin(req) {
    const {idToken} = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: ClIENT_ID,
        });

        const payload = ticket.getPayload();

        // Split the name into first and last name
        const nameParts = payload.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts[1] : '';


        // Here you can create the user in your database if they don't exist
        // and fetch the user info to return to the frontend
        const user = {
            id: payload.sub,
            email: payload.email,
            firstName: firstName,
            lastName: lastName,
            username: payload.name,
            userImage: payload.picture,
            phone: '',
        };
        // check if user already exists
        const foundUser = await User.findOne({email: user.email});
        if (foundUser) {
            console.log('User already exists');
            updateUserByEmail(user);
            return {user};
        }

        // create a new user
        const newUser = new User({
            email: user.email,
            username: user.username,
            userImage: user.userImage,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: '',
        });

        await newUser.save();
        return {user: newUser};
    } catch (error) {
        console.error(error);
        throw new Error('Google login failed');
    }

}