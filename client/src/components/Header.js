import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="home-header">
      <div className="home-logo">Agri Shop E‑Commerce</div>
      <nav className="home-nav">
        <Link to="/" className="home-nav-link">Home</Link>
        <Link to="/cart" className="home-nav-link">Cart</Link>
        <Link to="/dashboard" className="home-nav-link">Dashboard</Link>
        
        <button className="home-logout-btn" onClick={logout}>Log Out</button>
      </nav>
    </header>
  );
};

export default Header;
