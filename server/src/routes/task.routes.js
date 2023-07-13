require("dotenv").config();
const router = require("express").Router();

const { getAllTasks } = require("../controllers/task.controller");
const {
  checkAccess,
  checkSelfAccess,
} = require("../middlewares/accessibility.middleware");

router.get("/all/user-id/:id", checkAccess, checkSelfAccess, getAllTasks);

module.exports = router