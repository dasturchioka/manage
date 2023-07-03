require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = async (data) => {
  const token = jwt.sign({ ...data }, process.env.JWT_SECRET);
  return token;
};

const verifyToken = async (token, keyword) => {
  const decoded = jwt.verify(token, keyword)

  if (!decoded) {
    throw new Error("token is invalid")
  } else {
    return decoded
  }
}

module.exports = { generateToken, verifyToken };
