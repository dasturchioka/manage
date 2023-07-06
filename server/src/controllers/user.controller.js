require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { verifyToken } = require("../utils/manageToken");

const getSelf = async (req, res) => {
  try {
    const token = req.headers["Authorization"]?.split(" ")[1];
    const { id } = req.params;

    const verifiedToken = await verifyToken(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status();
    }
  } catch (error) {}
};
