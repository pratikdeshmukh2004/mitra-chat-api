const Users = require("../models/user");
const bcrypt = require("bcrypt");

const { genrateToken } = require("../auth/auth");

class Userservice {
  async SignUp(user_data) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user_data.password, salt);
      user_data.password = hashedPassword;
      const user = await Users.query().insert(user_data);
      return user;
    } catch (error) {
      console.log(error);
      if (!error.nativeError) {
        return {
          error: "Internal server error",
          code: 500,
        };
      }
      return {
        error: error.nativeError.sqlMessage,
        code: error.nativeError.errno,
      };
    }
  }

  async Login(user_data) {
    try {
      const existUser = await Users.query().findOne({ email: user_data.email });
      if (!existUser) {
        return { status: false, message: "This user email dons't exists....." };
      }
      const passwordMatch = await bcrypt.compare(
        user_data.password,
        existUser.password
      );
      if (!passwordMatch) {
        return { status: false, message: "Invalid email or password..." };
      }

      const token = genrateToken(existUser);
      return {
        code: 200,
        message: "Login Successfully...",
        user: existUser,
        token: token,
      };
    } catch (error) {
      console.log(error);
      return { status: false, message: error.message };
    }
  }


}

module.exports = new Userservice();
