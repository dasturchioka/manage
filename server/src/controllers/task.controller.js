const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany({
      orderBy: {
        dashboardId: "asc",
      },
    });

    if (!tasks) {
      return res.status(404).json({
        status: "not found",
        msg: "There are no tasks yet.",
      });
    }

    return res.json({ tasks, status: "ok" });
  } catch (error) {
    return res.status(500).json({ error, msg: error.message });
  }
};

const getDashboardTasks = async (req, res) => {
  try {
    const { id: dashboardId } = req.body;

    const tasks = await prisma.tasks.findMany({
      where: {
        dashboardId,
      },
    });

    if (!tasks) {
      return res.status(404).json({
        status: "not found",
        msg: "There are no tasks in this dashboard yet.",
      });
    }

    return res.json({ tasks, status: "ok" });
  } catch (error) {
    return res.status(500).json({ error, msg: error.message });
  }
};

module.exports = { getAllTasks, getDashboardTasks };
