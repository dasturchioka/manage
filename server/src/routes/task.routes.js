require("dotenv").config();
const router = require("express").Router();

const { getAllTasks } = require("../controllers/task.controller");

router.get("/all/user-id/:id", getAllTasks);
