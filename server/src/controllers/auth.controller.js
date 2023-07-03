require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { generateToken } = require("../utils/manageToken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.create({
      data: { username, password },
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
      msg: "You successfully signed up. Here you go!",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error, msg: "Something went wrong" });
  }
};

module.exports = {register, login}
