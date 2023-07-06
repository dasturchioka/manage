require("dotenv").config();
const router = require("express").Router();
const {
  checkAccess,
  checkSelfAccess,
} = require("../middlewares/accessibility.middleware");
const { getSelf } = require("../controllers/user.controller");

// get self
router.get("/:id", checkAccess, checkSelfAccess, getSelf);

module.exports = router;
