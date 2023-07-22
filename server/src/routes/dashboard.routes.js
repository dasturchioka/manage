require("dotenv").config();
const router = require("express").Router();
const {
  getAllDashboards,
  createDashboard,
  deleteDashboard,
  changeDashboardName,
} = require("../controllers/dashboard.controller");
const {
  checkAccess,
  checkSelfAccess,
} = require("../middlewares/accessibility.middleware");

router.get("/all", checkAccess, checkSelfAccess, getAllDashboards);
router.post("/create", checkAccess, checkSelfAccess, createDashboard);
router.delete("/delete", checkAccess, checkSelfAccess, deleteDashboard);
router.put("/edit", checkAccess, checkSelfAccess, changeDashboardName);

// remove their middlewares and put them into their route file (simplifying the task.)

module.exports = router;
