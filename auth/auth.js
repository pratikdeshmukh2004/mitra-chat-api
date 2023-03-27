const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.cookie.split("=")[1];
  if (token) {
    const token_data = jwt.verify(token, process.env.SECRET_KEY);
    res.tokendata = token_data;
    return next();
  }
  return res.send({ status: "error", message: "invalid auth." });
};

const genrateToken = (data) => {
  const token = jwt.sign(
    { id: data.id, name: data.name, email: data.email },
    process.env.SECRET_KEY
  );
  return token;
};

module.exports = { verifyToken, genrateToken };
