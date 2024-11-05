export interface IPerson {
    firstName: string;
    lastName: string;
    address: string;
    zipcode: string;
    phone: string;
    isActive?: boolean;
    email: string;
}

export interface IUser {
    _id?: string;
    person?: IPerson;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    userImage?: string;
    refreshToken?: string;
    accessToken?: string;
}