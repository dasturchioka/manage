require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { verifyToken } = require("../utils/manageToken");
const prisma = new PrismaClient();

const checkAccess = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        msg: "You don't have permission to operate that",
        status: `Access denied (token is not found)`,
        code: 403,
      });
    }

    const verifiedToken = await verifyToken(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(403).json({
        msg: "You don't have permission to operate that",
        status: `Access denied (token is not verified)`,
        code: 403,
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

const checkSelfAccess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        msg: "You don't have permission to operate that",
        status: `Access denied (token is not found)`,
        code: 403,
      });
    }

    const verifiedToken = await verifyToken(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(403).json({
        msg: "You don't have permission to operate that",
        status: `Access denied (token is not verified)`,
        code: 403,
      });
    }

    const existUser = await prisma.user.findUnique({
      where: {
        id: verifiedToken.id,
      },
    });

    if (!existUser) {
      return res.status(403).json({
        code: 403,
        status: "Access denied (user is not found)",
        msg: "You don't have permission to operate that",
      });
    }

    if (existUser.id !== id) {
      return res.status(403).json({
        code: 403,
        status: "Access denied (property is not user's)",
        msg: "You don't have permission to operate that",
        token
      });
    }

    req.user = existUser;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { checkAccess, checkSelfAccess };
