import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPerson, IUser } from "../../models/user";
const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
export type UserState = {
    user?: IUser;
    isLoggedIn?: boolean;
    accessToken?: string;
    refreshToken?: string;
};
const initialState: UserState = user
    ? {
        user: user.user,
        isLoggedIn: true,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
    }
    : {
        user: {
            person: {} as IPerson,
            username: "",
            password: "",
        },
        isLoggedIn: false,
        accessToken: undefined,
        refreshToken: undefined,
    };
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<UserState>) => {
            return {
                user: action.payload.user,
                isLoggedIn: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        },
        deleteUser: (state) => {
            console.log("Deleting user");
            return {
                user: undefined,
                isLoggedIn: false,
                accessToken: undefined,
                refreshToken: undefined,
            };
        },
    },
});
export const { saveUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;