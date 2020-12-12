import { createContext } from "react";

export const AuthContext = createContext();

export const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

export const destroyTokens = () => {
     localStorage.clear();
}

export const accessToken = localStorage.getItem("accessToken");

export const refreshToken = localStorage.getItem("refreshToken");

export const setHeaders = () => (
    accessToken ? {'Authorization': `Bearer ${accessToken}`} : {}
)

export const isLoggedIn = accessToken ? true : false

export const logout = () => {
    destroyTokens();
}
