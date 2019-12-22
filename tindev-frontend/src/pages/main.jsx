import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import api from '../services/api';

import './main.css';
import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);
  const [isLiked, setIsLiked] = useState({ active: null, id: 0 });
  const [isDisliked, setIsDisliked] = useState({ active: null, id: 0 });

  useEffect(() => {
    async function loadUsers() {
      const res = await api.get('/devs', {
        headers: { user_id: match.params.id }
      });
      setUsers(res.data);
    }
    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      query: { user: match.params.id }
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  const removeUser = id => {
    setTimeout(() => {
      setUsers(users.filter(user => user._id !== id));
    }, 1000);
  };

  const handleLike = async id => {
    await setIsLiked({ active: true, id });
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user_id: match.params.id }
    });
    removeUser(id);
  };
  const handleDislike = async id => {
    await setIsDisliked({ active: true, id });
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user_id: match.params.id }
    });
    removeUser(id);
  };

  return (
    <div className='main-container'>
      <Link to='/'>
        <img src={logo} alt='Tindev' />
      </Link>

      {users.length ? (
        <ul>
          {users.map(user => (
            <li
              key={user._id}
              className={[
                isLiked.active && isLiked.id === user._id ? 'liked' : '',
                isDisliked.active && isDisliked.id === user._id
                  ? 'disliked'
                  : ''
              ].join(' ')}
            >
              <img src={user.avatar} alt={user.avatar} />

              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className='buttons'>
                <button onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt='Dislike dev' />
                </button>
                <button onClick={() => handleLike(user._id)}>
                  <img src={like} alt='Like' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className='empty'>
          Acabou{' '}
          <span role='img' aria-label='sad'>
            😥
          </span>
        </div>
      )}

      {matchDev && (
        <div className='match-container'>
          <img src={itsamatch} alt="It's a match" />
          <img className='avatar' src={matchDev.avatar} alt={matchDev.name} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type='button' onClick={() => setMatchDev(null)}>
            FECHAR
          </button>
        </div>
      )}
    </div>
  );
}
