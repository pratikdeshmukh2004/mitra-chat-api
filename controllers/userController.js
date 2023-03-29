const userService = require("../services/userService");
const { verifyToken } = require("../auth/auth");

const SignUp = (req, res) => {
  const { name, email, password } = req.body;
  userService.SignUp({ name, email, password }).then((result) => {
    return res.json({ status: true, data: result });
  }).catch((error) => {
    if (error.nativeError.code == 23505) {
      return res.json({ status: false, message: "Email already exists." });
    }
    return res.json({ status: false, message: "Internal server error." });
  })
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