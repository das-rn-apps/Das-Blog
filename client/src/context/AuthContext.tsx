// frontend/src/context/AuthContext.tsx
import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../api/blogApi'; // Renamed to avoid conflict

interface UserInfo {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

interface AuthContextType {
    userInfo: UserInfo | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, isAdmin?: boolean) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
        try {
            const storedUserInfo = localStorage.getItem('userInfo');
            return storedUserInfo ? JSON.parse(storedUserInfo) : null;
        } catch (error) {
            console.error("Failed to parse userInfo from localStorage", error);
            return null;
        }
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [userInfo]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiLogin(email, password);
            setUserInfo(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
            setUserInfo(null); // Ensure user info is cleared on login failure
        } finally {
            setLoading(false);
        }
    };

    const register = async (username: string, email: string, password: string, isAdmin: boolean = false) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiRegister(username, email, password, isAdmin);
            setUserInfo(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
            setUserInfo(null); // Ensure user info is cleared on registration failure
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider value={{ userInfo, loading, error, login, register, logout }}>
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