require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSelf = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        msg: "User is not found",
        status: "not found",
        code: 404,
      });
    }

    return res.json({ user, msg: "User is found", status: "ok" });
  } catch (error) {
    return res.status(500).json({ error, msg: error.message });
  }
};

module.exports = { getSelf };
