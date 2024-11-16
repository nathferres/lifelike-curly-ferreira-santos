import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../auth";
import "../assets/styles/NavBar.css";

function NavBar() {
  const { currentUser } = useAuth();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setIsMenuActive(false);
    navigate("/");
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        {/* Logo e nome da marca */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo-link">
            {/* Imagem da logo */}
            <img
              src="../logo-lflk.png" // Caminho para a imagem da logo
              alt="Logo"
              className="navbar-logo" // Classe CSS para a logo
            />
            {/* Nome da Marca */}
            <span className="brand-name">Lifelike Curly</span>
          </Link>
        </div>

        {/* Links de navegação */}
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/category/Manteigas">Manteigas</Link>
          <Link to="/category/Óleos">Óleos</Link>
          <Link to="/cart">Carrinho</Link>
          <Link to="/orders">Pedidos</Link>
          <Link to="/checkout">Finalizar Compra</Link>
        </div>

        {/* Menu de usuário */}
        <div className="navbar-user">
          {currentUser ? (
            <div>
              <button
                type="button"
                onClick={() => setIsMenuActive(!isMenuActive)}
              >
                <img
                  className="user-avatar"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
              </button>
              {isMenuActive && (
                <div className="dropdown-menu">
                  <a href="#" role="menuitem">Your Profile</a>
                  <a href="#" role="menuitem">Settings</a>
                  <a href="#" role="menuitem" onClick={handleSignOut}>Sign out</a>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin">Sign in</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export { NavBar };

