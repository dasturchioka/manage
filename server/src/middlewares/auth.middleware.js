require("dotenv").config();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkFields = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (username.length < 3 && password.length < 8) {
      return res.status(400).json({
        status: "bad fields",
        msg: "Username and password must be at least 3 and 8 respectively!",
      });
    }

    const existUser = await prisma.user.findUnique({ where: { username } });

    if (existUser) {
      return res.status(400).json({
        status: "username is unavailable",
        msg: "Username is already taken, choose another one!",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

const checkPassword = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existUser = await prisma.user.findUnique({ where: { username } });

    const verifyPassword = await bcrypt.compare(password, existUser.password);

    if (!verifyPassword) {
      return res
        .status(400)
        .json({ status: "incorrect password", msg: "Password is incorrect" });
    }

    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { checkFields, checkPassword };
