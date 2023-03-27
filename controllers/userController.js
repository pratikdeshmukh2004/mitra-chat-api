const userService = require("../services/userService");

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
      token: result.token,
    });
  }
  res.cookie("token", result.token).send(result);
};

module.exports = { SignUp, Login };