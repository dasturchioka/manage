require("dotenv").config();
const router = require("express").Router();

const {
  getAllTasks,
  getDashboardTasks,
} = require("../controllers/task.controller");
const {
  checkAccess,
  checkSelfAccess,
} = require("../middlewares/accessibility.middleware");

router.get("/all/user-id/:id", checkAccess, checkSelfAccess, getAllTasks);

router.get(
  "/dashboard-tasks/:dashboardId/user-id/:id",
  checkAccess,
  checkSelfAccess,
  getDashboardTasks
);

module.exports = router;
