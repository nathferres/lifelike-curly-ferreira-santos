// src/components/NavBar.js
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <img src="./logo-lflk.png" alt="logo" />
        <Link className="navbar-brand" to="/">Lifelike Curly</Link>
        <div className="d-flex">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/category/kits" className="nav-link">Kit Detox</Link>
          <Link to="/category/kits" className="nav-link">Kit Hidratantes</Link>
          <Link to="/category/manteigas" className="nav-link">Manteigas</Link>
          <Link to="/category/óleos" className="nav-link">Óleos</Link>
          <Link to="/quem somos" className="nav-link">Quem Somos</Link>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

