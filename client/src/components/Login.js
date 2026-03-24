import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css'; // ✅ reuse same style

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      navigate('/');
    } catch (err) {
      setMsg(err.response?.data.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper signup-wrapper">
      
      {/* LEFT PANEL (same style as signup) */}
      <div className="auth-panel auth-panel-left signup-left">
        <h2>Welcome Back!</h2>
        <p className="auth-subtitle">
          We missed you! Login to continue exploring AgriStore and manage your products.
        </p>

        <p className="auth-switch-text">
          Don’t have an account?{' '}
          <Link to="/signup" className="auth-switch-link">
            Signup
          </Link>
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-panel auth-panel-right signup-right">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button type="submit" className="auth-button signup-button">
            Login
          </button>
        </form>

        {msg && <p className="auth-message">{msg}</p>}

        <p className="auth-social-text">or login with</p>
        <div className="auth-social-row">
          <span className="auth-social-circle fb">f</span>
          <span className="auth-social-circle google">G</span>
          <span className="auth-social-circle linkedin">in</span>
        </div>
      </div>
    </div>
  );
};

export default Login;