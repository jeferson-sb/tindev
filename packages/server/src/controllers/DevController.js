import axios from 'axios'
import DevService from '../services/DevService.js'

const index = async (req, res) => {
  const { user_id } = req.headers;
  const users = await DevService.index(user_id);

  return res.json(users);
};

const store = async (req, res) => {
  const { username } = req.body;
  const userExists = await DevService.get(username);
  if (userExists) {
    return res.json(userExists);
  } else {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const { name, bio, avatar_url: avatar } = response.data;
      const dev = await DevService.store({ name, username, bio, avatar });

      return res.json(dev);
    } catch (error) {
      return res.json({ error: 'Github user not found!' });
    }
  }
};

export default { index, store };
