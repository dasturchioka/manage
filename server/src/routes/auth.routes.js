require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { generate } = require("../utils/manageToken");

router.get("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = await prisma.user.create({
      data: { username, password },
    });


  } catch (error) {}
});
