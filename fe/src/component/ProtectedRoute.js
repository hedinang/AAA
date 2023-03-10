import React from 'react';
import {
    Navigate
} from 'react-router-dom';

//My Private Route
export const PrivateRoute = ({ children }) => {
    const auth = window.localStorage.getItem('user')
    return auth ? children : <Navigate to="/login" />;
};