// frontend/src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Changed import

const Navbar: React.FC = () => {
    const userInfo = useAuthStore((state) => state.userInfo);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const getProfileInitial = (username: string) => {
        return username ? username.charAt(0).toUpperCase() : 'U';
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">My Blog</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    {userInfo ? (
                        <>
                            {userInfo.isAdmin && (
                                <Link to="/admin" className="hover:text-gray-300">Admin</Link>
                            )}
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    {/* Circular Profile Initial */}
                                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-semibold border-2 border-white">
                                        {getProfileInitial(userInfo.username)}
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;