'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: 'customer' | 'admin';
}

interface AuthContextType {
    user: User | null;
    isAdmin: boolean;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing sessions
        const authData = Cookies.get('user_auth');
        if (authData) {
            try {
                setUser(JSON.parse(authData));
            } catch (e) {
                Cookies.remove('user_auth');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        const expires = 7; // 7 days
        Cookies.set('user_auth', JSON.stringify(userData), { expires, path: '/' });
        setUser(userData);
    };

    const logout = () => {
        Cookies.remove('user_auth', { path: '/' });
        setUser(null);
    };

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
