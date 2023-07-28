const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await prisma.tasks.findMany({
      where: { dashboard: { userId: id } },
      orderBy: [{ status: "asc" }, { priority: "desc" }],
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
    const { dashboardId, id: userId } = req.params;
    const { name, description, priority, status, subtasks } = req.body;

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
        dashboardId,
      },
    });

    return res.json({ task: newTask, status: "ok", msg: "New task created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, msg: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(402).json({
        status: "id required",
        msg: "task id must be filled",
      });
    }

    const updateTask = await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        ...req.body,
      },
    });

    return res.json({ status: "ok", msg: "Task updated", task: updateTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, msg: error.message });
  }
};

const updateStatusOrPriority = async (req, res) => {
  try {
    const { field, taskId } = req.params;

    if (!taskId) {
      return res.status(402).json({
        status: "id required",
        msg: "task id must be filled",
      });
    }

    const foundTask = await prisma.tasks.findUnique({ where: { id: taskId } });

    if (!foundTask) {
      return res.status(404).json({
        status: "not found",
        msg: "task on this id is not found",
      });
    }

    if (field === "status") {
      const updatedTask = await prisma.tasks.update({
        where: { id: taskId },
        data: { status: req.body.field },
      });

      return res.json({
        status: "ok",
        msg: "Status of the task was set",
        task: updatedTask,
      });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: taskId },
      data: { priority: req.body.field },
    });

    return res.json({
      status: "ok",
      msg: "Priority of the task was set",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({ error, msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(402).json({
        status: "id required",
        msg: "task id must be filled",
      });
    }

    await prisma.tasks.delete({ where: { id: taskId } });

    const tasks = await prisma.tasks.findMany({});

    return res.json({ status: "ok", msg: "Task deleted", tasks });
  } catch (error) {
    return res.status(500).json({ error, msg: error.message });
  }
};

module.exports = {
  getAllTasks,
  getDashboardTasks,
  createTask,
  updateTask,
  updateStatusOrPriority,
  deleteTask,
};
