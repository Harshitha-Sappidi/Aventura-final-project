import * as userService from '../services/user-service.js';
import {setError, setResponse} from './response-handler.js';

// register a new user
export async function registerUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        setResponse(user, res);
    } catch (error) {
        setError(error, res);
    }
}

// login a user
export async function loginUser(req, res) {
    try {
        const user = {...req.body};

        const {
            user: validatedUser,
            accessToken,
            refreshToken,
        } = await userService.login(user);
        setResponse(
            {user: validatedUser, accessToken, refreshToken},
            res,
            200
        );
    } catch (error) {
        setError(error, res);
    }
}

// get a user by ID

// update a user by ID


export async function updateUserByEmail(req, res) {
    try {
        const updatedUser = await userService.updateUserByEmail(
            req.body
        );
        if (!updatedUser) {
            return res.status(404).json({error: 'User not found'});
        }
        setResponse({user: updatedUser}, res, 200);
    } catch (error) {
        setError(error, res);
    }
}

// delete a user by ID


// get a user by email
export async function getUserByEmail(req, res) {
    try {
        const user = await userService.findUserByEmail(req.params.email);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }
        setResponse(user, res);
    } catch (error) {
        setError(error, res);
    }
}

// google Login
export async function googleLogin(req, res) {
    try {
        const user = await userService.googleLogin(req);
        setResponse(user, res);
    } catch (error) {
        setError(error, res);
    }
}
