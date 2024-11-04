// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);

    const logout = () => setUserType(null);

    return (
        <AuthContext.Provider value={{ userType, setUserType, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
