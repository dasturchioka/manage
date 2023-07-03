require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  checkFields,
  checkPassword,
  checkUserAvailibility,
} = require("../middlewares/auth.middleware");
const { generateToken } = require("../utils/manageToken");

router.post("/register", checkFields, async (req, res) => {
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
});

router.post(
  "/login",
  checkFields,
  checkPassword,
  checkUserAvailibility,
  async (req, res) => {
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
  }
);

module.exports = router