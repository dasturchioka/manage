require("dotenv").config();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkFields = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username && !password || !username || !password) {
      return res.status(400).json({
        status: "bad fields",
        msg: "Username and password must be written!",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        status: "bad fields",
        msg: "Username must be at least 3",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: "bad fields",
        msg: "Password must be at least 8",
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

const checkUserAvailibility = async (req, res, next) => {
  try {
    const { username } = req.body;

    const existUser = await prisma.user.findUnique({ where: { username } });

    if (!existUser) {
      return res.status(404).json({
        status: "user is not found",
        msg: "There is no user in this username, check it again!",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { checkFields, checkPassword, checkUserAvailibility };
