const Dev = require('../models/Dev');

const store = async (req, res) => {
  const { id: devId } = req.params;
  const { user } = req.headers;

  const loggedDev = await Dev.findById(user);
  const targetDev = await Dev.findById(devId);

  if (!targetDev) {
    return res.status(400).json({ error: 'Dev does not exists!' });
  }

  if (targetDev.likes.includes(loggedDev._id)) {
    const loggedSocket = req.connectedUsers[user];
    const targetSocket = req.connectedUsers[devId];
    if (loggedSocket) {
      req.io.to(loggedSocket).emit('match', targetDev);
    }
    if (targetSocket) {
      req.io.to(targetSocket).emit('match', loggedDev);
    }
  }

  loggedDev.likes.push(targetDev._id);

  await loggedDev.save();

  return res.json(loggedDev);
};

module.exports = { store };
