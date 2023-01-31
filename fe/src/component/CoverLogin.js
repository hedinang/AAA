import { Navigate } from "react-router";

export const CoverLogin = ({ children }) => {
    const auth = window.localStorage.getItem('user')
    return auth ? <Navigate to="/" /> : children;
};