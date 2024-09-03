import React, { useState } from 'react';
import "../../css/navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${isOpen ? 'active' : ''}`}>
            <div className="logo">SneakR</div>
            <ul className="nav-links">
                <li><Link to="/">Catalog</Link></li>
                <li><Link to="/category/men">Men</Link></li>
                <li><Link to="/category/women">Women</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/account">My Account</Link></li>
            </ul>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;