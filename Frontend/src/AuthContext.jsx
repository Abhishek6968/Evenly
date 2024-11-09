// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [userType, setUserType] = useState(() => JSON.parse(localStorage.getItem('user'))?.userType || null);

    const login = (userData, authToken) => {
        setUser(userData);
        setUserType(userData.userType);
        setToken(authToken);
        
        // Persist user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setUser(null);
        setUserType(null);
        setToken(null);

        // Clear data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if (!user || !token) {
            // If the user or token is missing, ensure localStorage is cleared
            logout();
        }
    }, [user, token]);

    return (
        <AuthContext.Provider value={{ user, token, userType, setUserType, setUser, setToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
