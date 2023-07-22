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

router.get("/user-id/:id/all", checkAccess, checkSelfAccess, getAllDashboards);
router.post("/user-id/:id/create", checkAccess, checkSelfAccess, createDashboard);
router.delete("/user-id/:id/delete", checkAccess, checkSelfAccess, deleteDashboard);
router.put("/user-id/:id/edit", checkAccess, checkSelfAccess, changeDashboardName);

// remove their middlewares and put them into their route file (simplifying the task.)

module.exports = router;
