require("dotenv").config();
const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  checkFields,
  checkPassword,
  checkUserAvailibility,
} = require("../middlewares/auth.middleware");

const { register, login } = require("../controllers/auth.controller");

router.post("/register", checkFields, register);

router.post("/login", checkFields, checkPassword, checkUserAvailibility, login);

module.exports = router;
