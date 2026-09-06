import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);

      // Redirect to the originally requested route or home if no route was specified
      const redirectPath = location.state && location.state.from
        ? location.state.from
        : '/dashboard';

      // Use the navigate function to perform the redirection
      navigate(redirectPath);
    } catch (err) {
      setError('Email ou mot de passe incorrect.');
    }
  };


  return (
    <div className='login'>
    <form onSubmit={handleLogin} className='loginForm'>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      {error && <p className="login-error">{error}</p>}
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default LoginForm;