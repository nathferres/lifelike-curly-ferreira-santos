// src/components/NavBar.js
import React from 'react';
import './NavBar.css';
import CartWidget from './CartWidget';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="brand">Nome da Loja</div>
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link" href="#categoria1">Categoria 1</a></li>
                    <li className="nav-item"><a className="nav-link" href="#categoria2">Categoria 2</a></li>
                    <li className="nav-item"><a className="nav-link" href="#categoria3">Categoria 3</a></li>
                    <li className="nav-item"><a className="nav-link" href="#categoria4">Categoria 4</a></li>
                </ul>
                <CartWidget /> {/* Adicionando o CartWidget */}
            </div>
        </nav>
    );
};

export default NavBar;

