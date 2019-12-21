const Dev = require("../models/Dev");

class DevService {
  async index(user) {
    const loggedDev = await Dev.findById(user);
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });
    return { users };
  }
  async get(user) {
    const user = await Dev.findOne({ user: username });
    return { user };
  }
  async store({ name, username, bio, avatar }) {
    const user = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });
    return { user };
  }
}

module.exports.DevService = DevService;
