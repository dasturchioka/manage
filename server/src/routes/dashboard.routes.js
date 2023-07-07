require('dotenv').config()
const router = require('express').Router()
const { getAllDashboards, createDashboard } = require('../controllers/dashboard.controller');
const {
    checkAccess,
    checkSelfAccess,
  } = require("../middlewares/accessibility.middleware");

router.get('/all/user-id/:id', checkAccess, checkSelfAccess, getAllDashboards)
router.post('/create/user-id/:id', checkAccess, checkSelfAccess, createDashboard)