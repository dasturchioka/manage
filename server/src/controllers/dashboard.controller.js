require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createDashboard = async (req, res) => {
  try {
    const { name } = req.body;
    const newDashboard = await prisma.dashboard.create({
      data: {
        userId: req.params.id,
        name,
      },
    });

    return res.json({
      dashboard: newDashboard,
      msg: "New dashboard created",
      status: "ok",
    });
  } catch (error) {
    return res.status(500).json({error, error: error.message})
  }
};
