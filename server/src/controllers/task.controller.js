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
    const { dashboardId } = req.params;

    if (!dashboardId) {
      return res.status(402).json({
        status: "id must be here",
        msg: "Please enter the dashboard's id",
      });
    }

    const tasks = await prisma.tasks.findMany({
      where: {
        dashboardId,
      },
    });

    if (!tasks.length) {
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

const createTask = async (req, res) => {
  try {
    const { dashboardId } = req.params;
    const { name, description, priority, status, subtasks } = req.body;
    console.log(req.body);

    if (!dashboardId) {
      return res.status(402).json({
        status: "id must be here",
        msg: "Please enter the dashboard's id",
      });
    }

    if (!name && !description && !priority && !status) {
      return res.status(402).json({
        status: "fill everything",
        msg: "Please enter name, description, priority and status",
      });
    }

    const newTask = await prisma.tasks.create({
      data: {
        name,
        description,
        priority,
        status,
        subtasks,
        dashboardId
      },
    });

    return res.json({ task: newTask, status: "ok", msg: "New task created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, msg: error.message });
  }
};

const updateTask = async (req, res) => {
  
}

module.exports = { getAllTasks, getDashboardTasks, createTask };
