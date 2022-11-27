import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import Logo from '../../components/Logo'
import './styles.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/api/devs', {
      username,
    });

    const { _id } = res.data;

    navigate(`/dev/${_id}`);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <Logo />
        <input
          type="text"
          placeholder="Enter your github username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
