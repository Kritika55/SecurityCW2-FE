import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from "../utils/user-context";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { IoMdCart } from "react-icons/io";

const Navbar = ({ cartItemCount }) => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [navbarBackground, setNavbarBackground] = useState("bg-transparent");
    const [navbarTextColor, setNavbarTextColor] = useState("text-white");
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserContext);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/login");
            window.location.reload(); // Reload the page after logging out
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (location.pathname === "/") {
                if (scrollPosition > 100) {
                    setNavbarBackground("bg-white");
                    setNavbarTextColor("text-gray-900");
                } else {
                    setNavbarBackground("bg-transparent");
                    setNavbarTextColor("text-white");
                }
            } else {
                setNavbarBackground("bg-white");
                setNavbarTextColor("text-gray-900");
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    const handleCartClick = () => {
        if (!user) {
            alert("You need to log in to add items to the cart.");
            navigate("/login");
        } else {
            navigate("/cart");
        }
    };

    return (
        <nav className={`sticky top-0 z-20 transition-colors duration-300 ${navbarBackground} ${navbarTextColor}`}>
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/Logo1.png" className="h-20 w-20" alt="Flowbite Logo" />
                </Link>
                <button data-collapse-toggle="navbar-default" type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            <Link to="/"
                                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0">Home</Link>
                        </li>
                        <li className="relative group">
                            <Link to="/jewelries"
                                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0">Jewelries</Link>
                        </li>
                        <li>
                            <Link to="/contact"
                                className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0">Contact
                                Us</Link>
                        </li>
                        <li>
                            <button onClick={handleCartClick} className="relative block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-500 md:p-0">
                                <IoMdCart className="w-6 h-6" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>
                        </li>
                        <li className="relative">
                            {user && user ? (
                                <div ref={dropdownRef}
                                    className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                    <button type="button"
                                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                                        id="user-menu-button" aria-expanded="false"
                                        data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-8 h-8 rounded-full" src="" alt="user" />
                                    </button>
                                    <div
                                        className={`${isUserDropdownOpen ? 'block' : 'hidden'} border border-1 absolute right-0 top-8 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg`}
                                        id="user-dropdown">
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900">{user.username}</span>
                                            <span className="block text-sm text-gray-500 truncate">{user.email}</span>
                                        </div>
                                        <ul className="py-2" aria-labelledby="user-menu-button">
                                            <li>
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/my-orders"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    My Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <div onClick={handleLogout}
                                                    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Sign Out
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button
                                        className="text-white bg-yellow-400 hover:bg-yellow-500 font-bold rounded-lg text-sm px-5 py-2.5 me-2 dark:focus:ring-yellow-900">
                                        Login
                                    </button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
