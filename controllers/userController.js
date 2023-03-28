const userService = require("../services/userService");
const { verifyToken } = require("../auth/auth");

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userService.SignUp({ name, email, password });
  if (result.code == 1062) {
    return res.json({ status: false, message: "Email already exists." });
  } else if (result.code) {
    return res.json({ status: false, message: "Internal server error." });
  } else {
    return res.json({ status: true, data: result });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.Login({ email, password });
  if (result.code == 200) {
    return res.json({
      status: true,
      message: "Login Successfully...",
      user: result.user,
      accessToken: result.token,
    });
  }
  res.cookie("token", result.token).send(result);
};


const getUser = async (req, res) => {
  const token = req.headers.authorization
  console.log(token, 'token...');
  const result = await verifyToken(token);
  if (result) {
    return res.json({
      status: true,
      message: "User verified...",
      user: result.user,
      accessToken: result.token,
    });
  }
  res.cookie("token", result.token).send(result);
};

module.exports = { SignUp, Login, getUser };