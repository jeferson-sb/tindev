import Dev from '../models/Dev.js'

class DevService {
  static async index(userID) {
    try {
      if (userID) {
        const loggedDev = await Dev.findById(userID);
        const users = await Dev.find({
          $and: [
            { _id: { $ne: userID } },
            { _id: { $nin: loggedDev.likes } },
            { _id: { $nin: loggedDev.dislikes } }
          ]
        });
        return users;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  static async get(username) {
    try {
      const user = await Dev.findOne({ username });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async store(userObj) {
    try {
      const user = await Dev.create(userObj);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default DevService;
