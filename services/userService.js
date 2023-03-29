const Users = require("../models/user");

class Userservice {
  async SignUp(user_data) {
    try {
      const user = await Users.query().insert(user_data);
      return user;
    } catch (error) {
      return error;
    }
  }

  async GetUserByEmail(user_data) {
    try {
      const existUser = await Users.query().findOne({ email: user_data.email });
      return existUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new Userservice();