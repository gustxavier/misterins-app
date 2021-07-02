import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/api';

export default function ProtectedRoute(props) {
    const [token] = localStorage.getItem('token');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const Component = props.component;

    useEffect(() => {
        api.get('users/isLogged/',
            null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response, 'AEWWWWWWWWW');
            setIsAuthenticated(true)
        });
    }, [token])

    return isAuthenticated ? <Component /> : <Redirect to={{ pathname: '/' }} />;
}