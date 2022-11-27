import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import itsamatch from '../../assets/itsamatch.png';
import Like from '../../components/Like'
import Dislike from '../../components/Dislike'
import Logo from '../../components/Logo'

function Main() {
  const { id: matchId } = useParams();
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);
  const [isLiked, setIsLiked] = useState({ active: null, id: 0 });
  const [isDisliked, setIsDisliked] = useState({ active: null, id: 0 });

  useEffect(() => {
    async function loadUsers() {
      const res = await api.get('/api/devs', {
        headers: { user_id: matchId },
      });
      setUsers(res.data);
    }
    loadUsers();
  }, [matchId]);

  useEffect(() => {
    console.log(api.defaults.baseURL)
    const socket = io(`${api.defaults.baseURL}`, {
      query: { user: matchId },
    });

    socket.on('match', (dev) => {
      setMatchDev(dev);
    });
  }, [matchId]);

  const removeUser = (id) => {
    setTimeout(() => {
      setUsers(users.filter((user) => user._id !== id));
    }, 1000);
  };

  const handleLike = async (id) => {
    setIsLiked({ active: true, id });
    await api.post(`/api/devs/${id}/likes`, null, {
      headers: { user_id: matchId },
    });
    removeUser(id);
  };
  const handleDislike = async (id) => {
    setIsDisliked({ active: true, id });
    await api.post(`/api/devs/${id}/dislikes`, null, {
      headers: { user_id: matchId },
    });
    removeUser(id);
  };

  return (
    <div className="main-container">
      <Link to="/">
        <Logo />
      </Link>

      {users.length ? (
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              className={[
                isLiked.active && isLiked.id === user._id ? 'liked' : '',
                isDisliked.active && isDisliked.id === user._id
                  ? 'disliked'
                  : '',
              ].join(' ')}
            >
              <img src={user.avatar} alt={user.avatar} />

              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" aria-label="Dislike" onClick={() => handleDislike(user._id)}>
                  <Dislike />
                </button>
                <button type="button" aria-label="Like" onClick={() => handleLike(user._id)}>
                  <Like />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          This is the end.{' '}
          <span role="img" aria-label="sad">
            😥
          </span>
        </div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setMatchDev(null)}>
            CLOSE
          </button>
        </div>
      )}
    </div>
  );
}

Main.propTypes = {
  match: PropTypes.object,
};

export default Main;
