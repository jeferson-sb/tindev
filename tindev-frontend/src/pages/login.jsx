import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './login.css';
import api from '../services/api';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/devs', {
      username
    });

    const { _id } = res.data;

    history.push(`/dev/${_id}`);
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt='Logo Tindev' />
        <input
          type='text'
          placeholder='Digite seu usuário no Github'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
