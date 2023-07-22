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

router.get("/all", checkAccess, checkSelfAccess, getAllTasks);

router.get(
  "/dashboard-tasks/:dashboardId",
  checkAccess,
  checkSelfAccess,
  getDashboardTasks
);

module.exports = router;
