


import React, { useState } from 'react';
import { FaUser, FaHeart,FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/image1.png'; // Your logo
import logo2 from '../assets/image2.png';
import { useAuth } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // ✅ all nav links with correct paths
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Discover', path: '/discover' },
        { name: 'Activities', path: '/activities' },
        { name: 'Contact', path: '/contact' },
        { name: 'About', path: '/about' },
    ];

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => setIsDropdownOpen(false);

    const handleRedirect = () => {
        if (auth.user?.role === "admin") {
            navigate('/admin/details');
        } else {
            navigate('/user');
        }
    };

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Logged Out Successfully");
        navigate("/");
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <img src={logo2} alt="Logo" className="ml-[7rem] h-10 w-auto cursor-pointer"
                     onClick={() => navigate('/')} />
                <img src={logo} alt="Logo" className="ml-[7rem] h-10 w-auto cursor-pointer"
                     onClick={() => navigate('/')} />
            </div>

            {/* Navbar links */}
            <div className="hidden md:flex space-x-6">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.path}
                        className="group flex flex-col gap-0.5 text-gray-600 hover:text-gray-900 transition-all"
                    >
                        {link.name}
                        <div className="h-0.5 w-0 group-hover:w-full bg-gray-700 transition-all duration-300" />
                    </Link>
                ))}
            </div>

            {/* Right icons (wishlist & profile) */}
            <div className="flex items-center space-x-4 mr-[9rem] relative cursor-pointer">
                {/* Heart icon → wishlist/cart */}
                <FaShoppingCart size={20} onClick={() => navigate("/cart")} className="hover:text-red-500" />

                {/* User dropdown */}
                <FaUser size={20} onClick={handleDropdownToggle} />

                {isDropdownOpen && (
                    <div
                        className="absolute right-0 mt-36 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                        onMouseLeave={closeDropdown}
                    >
                        <ul>
                            <li
                                onClick={handleRedirect}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                Your Profile
                            </li>

                            {auth.user ? (
                                <li
                                    onClick={handleLogout}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Sign Out
                                </li>
                            ) : (
                                <li
                                    onClick={() => navigate("/login")}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <Link to="/login">Sign In</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
