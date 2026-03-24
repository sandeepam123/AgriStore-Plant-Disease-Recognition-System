import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/signup',
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      navigate('/login');
    } catch (err) {
      setMsg(err.response?.data.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-wrapper signup-wrapper">
      <div className="auth-panel auth-panel-left signup-left">
        <h2>Come join us!</h2>
        <p className="auth-subtitle">
          We are so excited to have you here. If you haven&apos;t already, create an account
          to get access to exclusive offers, rewards, and discounts.
        </p>
        <p className="auth-switch-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-switch-link">
            Signin.
          </Link>
        </p>
      </div>

      <div className="auth-panel auth-panel-right signup-right">
        <h2 className="auth-title">Signup</h2>
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
            Signup
          </button>
        </form>

        {msg && <p className="auth-message">{msg}</p>}

        <p className="auth-social-text">or signup with</p>
        <div className="auth-social-row">
          <span className="auth-social-circle fb">f</span>
          <span className="auth-social-circle google">G</span>
          <span className="auth-social-circle linkedin">in</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
