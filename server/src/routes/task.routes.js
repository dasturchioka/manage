require("dotenv").config();
const router = require("express").Router();

const {
  getAllTasks,
  getDashboardTasks,
  createTask,
  updateTask,
  updateStatusOrPriority,
  deleteTask,
  getDashboardTasksByStatus,
} = require("../controllers/task.controller");
const {
  checkAccess,
  checkSelfAccess,
} = require("../middlewares/accessibility.middleware");

router.get("/user-id/:id/all", checkAccess, checkSelfAccess, getAllTasks);

router.get(
  "/user-id/:id/dashboard-tasks/:dashboardId",
  checkAccess,
  checkSelfAccess,
  getDashboardTasks
);

router.get(
  "/user-id/:id/dashboard-tasks/:dashboardId/:status",
  checkAccess,
  checkSelfAccess,
  getDashboardTasksByStatus
);

router.post(
  "/user-id/:id/create/:dashboardId",
  checkAccess,
  checkSelfAccess,
  createTask
);

router.put(
  "/user-id/:id/update/:taskId",
  checkAccess,
  checkSelfAccess,
  updateTask
);

router.put(
  "/user-id/:id/update-status-priority/:field/:taskId",
  checkAccess,
  checkSelfAccess,
  updateStatusOrPriority
);

router.delete(
  "/user-id/:id/delete-task/:taskId",
  checkAccess,
  checkSelfAccess,
  deleteTask
);

module.exports = router;
