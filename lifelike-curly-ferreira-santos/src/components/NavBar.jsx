// src/components/NavBar.js
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">E-Commerce</Link>
        <div className="d-flex">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/category/electronics" className="nav-link">Electronics</Link>
          <Link to="/category/furniture" className="nav-link">Furniture</Link>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

