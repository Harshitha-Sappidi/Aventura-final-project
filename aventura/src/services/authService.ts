import {User} from '../models/user';



const API_URL = 'http://localhost:3000/users';
export const loginUser = async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}
export const createUser = async (userName: string, firstName: string, lastName: string, email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({userName, firstName, lastName, email, password}),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

export const registerUserWithGoogle = async (idToken: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/google-login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({idToken}),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
    return response.json();
}

export const updateUserByEmail = async (email: string, user: User): Promise<User> => {
    const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}