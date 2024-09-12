import { useState } from 'react';
import { Link } from 'react-router-dom';

import "../../css/navbar.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${isOpen ? 'active' : ''}`}>
            <div className="logo">SneakR</div>
            <ul className="nav-links">
                <li><Link to="/products">Catalog</Link></li>
                <li><Link to="/products/category/men">Men</Link></li>
                <li><Link to="/products/category/women">Women</Link></li>
                <li><Link to="/products/category/unisex">Unisex</Link></li>
                <li><Link to="/cgu">GCU</Link></li>
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/cart">Cart</Link></li>
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