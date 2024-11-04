// Navbar.js
import React from 'react';
import { useAuth } from '../AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { userType, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();       // Call the logout function
        navigate('/');  // Redirect to the home page after logout
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {location.pathname === '/' && !userType && <li><Link to="/login">Login</Link></li>}

                {userType === 'user' && (
                    <>
                        <li><Link to="/user/events">My Events</Link></li>
                        <li><Link to="/user/bookings">My Bookings</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}

                {userType === 'admin' && (
                    <>
                        <li><Link to="/admin/dashboard">Dashboard</Link></li>
                        <li><Link to="/admin/users">Manage Users</Link></li>
                        <li><Link to="/admin/events">Manage Events</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}

                {userType === 'organizer' && (
                    <>
                        <li><Link to="/organizer/myevents">My Events</Link></li>
                        <li><Link to="/organizer/bookings">View Bookings</Link></li>
                        <li><Link to="/organizer/notifications">Send Notifications</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
