require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { verifyToken } = require("../utils/manageToken");
const prisma = new PrismaClient();

const createDashboard = async (req, res) => {
  try {
    const { name } = req.body;

    const { id: userId } = req.params;

    console.log(name, userId);

    const newDashboard = await prisma.dashboard.create({
      data: {
        userId,
        name,
      },
    });

    return res.json({
      dashboard: newDashboard,
      msg: "New dashboard created",
      status: "ok",
    });
  } catch (error) {
    return res.status(500).json({ error, error: error.message });
  }
};

const getAllDashboards = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const dashboards = await prisma.dashboard.findMany({
      where: { userId },
      include: { tasks: true },
    });

    if (!dashboards.length) {
      return res.status(404).json({
        msg: "You don't have any dashboards yet",
        status: "not found",
      });
    }

    return res.json({ dashboards, msg: "Dashboards here" });
  } catch (error) {
    return res.status(500).json({ error, error: error.message });
  }
};

const deleteDashboard = async (req, res) => {
  try {
    console.log(req.body);
    const { id: dashboardId } = req.body;

    await prisma.dashboard.delete({
      where: { id: dashboardId },
      include: { tasks: true },
    });

    return res.json({ status: "ok", msg: "Dashboard deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, error: error.message });
  }
};

module.exports = { createDashboard, getAllDashboards, deleteDashboard };
