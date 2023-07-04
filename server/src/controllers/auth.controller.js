require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const { generateToken } = require("../utils/manageToken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashedPass },
    });

    const token = await generateToken(user);

    return res.json({
      status: "ok",
      msg: "You successfully signed up. Here you go!",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error, msg: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    const token = await generateToken(user);

    return res.json({
      status: "ok",
      msg: "You successfully logged in. Here you go!",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error, msg: "Something went wrong" });
  }
};

module.exports = { register, login }; 
