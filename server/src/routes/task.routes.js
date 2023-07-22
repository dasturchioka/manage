require("dotenv").config();
const router = require("express").Router();

const {
  getAllTasks,
  getDashboardTasks,
  createTask,
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

router.post(
  "/user-id/:id/create/:dashboardId",
  checkAccess,
  checkSelfAccess,
  createTask
);

module.exports = router;
