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

router.get("/all/user-id/:id", checkAccess, checkSelfAccess, getAllDashboards);
router.post(
  "/create/user-id/:id",
  checkAccess,
  checkSelfAccess,
  createDashboard
);
router.delete(
  "/delete/user-id/:id",
  checkAccess,
  checkSelfAccess,
  deleteDashboard
);
router.put(
  "/edit/user-id/:id",
  checkAccess,
  checkSelfAccess,
  changeDashboardName
);

// remove their middlewares and put them into their route file (simplifying the task.)

module.exports = router;
