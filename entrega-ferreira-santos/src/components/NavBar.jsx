// src/components/NavBar.js
import React from 'react';
import './NavBar.css';
import CartWidget from './CartWidget';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="brand">Lifelike Curly</div>
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#categoria1">Kits Hidratantes</a></li>
                    <li className="nav-item"><a className="nav-link" href="#categoria2">Óleos</a></li>
                    <li className="nav-item"><a className="nav-link" href="#categoria3">Manteigas</a></li>
                    <li className="nav-item"><a className="nav-link" href="#categoria4">Shamppoos</a></li>
                </ul>
                <CartWidget /> {/* Adicionando o CartWidget */}
            </div>
        </nav>
    );
};

export default NavBar;

