require("dotenv").config();
const jwt = require("jsonwebtoken");

const generate = async (data) => {
  const token = jwt.sign({ ...data }, process.env.JWT_SECRET);
  return { token, decoded };
};

module.exports = { generate };
