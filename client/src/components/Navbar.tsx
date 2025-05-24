import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LOGO from '../assets/logoD2.png'; // imported logo image

const Navbar: React.FC = () => {
    const userInfo = useAuthStore((state) => state.userInfo);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const location = useLocation();
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

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4 shadow-md text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo image */}
                <div className="flex items-center space-x-3">
                    <img
                        src={LOGO}
                        alt="Das blogs logo"
                        className="w-10 h-10"
                    />
                    <Link to="/" className="text-2xl font-extrabold tracking-tight hover:text-purple-400 transition duration-300">
                        My<span className="text-purple-600">Blog</span>
                    </Link>
                </div>


                <div className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className={`transition duration-300 font-medium ${isActive('/') ? 'text-cyan-400 font-semibold' : 'hover:text-cyan-400'}`}
                    >
                        Home
                    </Link>

                    {userInfo ? (
                        <>
                            {userInfo.isAdmin && (
                                <Link
                                    to="/admin"
                                    className={`transition duration-300 font-medium ${isActive('/admin') ? 'text-cyan-400 font-semibold' : 'hover:text-cyan-400'}`}
                                >
                                    Admin
                                </Link>
                            )}

                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center focus:outline-none"
                                >
                                    <div className="w-10 h-10 rounded-full bg-cyan-600 ring-2 ring-white flex items-center justify-center text-white text-lg font-bold shadow-sm hover:scale-105 transition duration-200">
                                        {getProfileInitial(userInfo.username)}
                                    </div>
                                </button>

                                {dropdownOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl border border-gray-200 z-50"
                                        style={{
                                            animation: 'fadeIn 0.3s ease-out',
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        }}
                                    >
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white rounded-md transition duration-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className={`transition duration-300 font-medium ${isActive('/login') ? 'text-cyan-400 font-semibold' : 'hover:text-cyan-400'}`}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
