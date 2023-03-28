const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  if (token) {
    const token_data = jwt.verify(token, process.env.SECRET_KEY);
    return token_data;
  }
  return null;
};

const genrateToken = (data) => {
  const token = jwt.sign(
    { id: data.id, name: data.name, email: data.email },
    process.env.SECRET_KEY
  );
  return token;
};

module.exports = { verifyToken, genrateToken };
