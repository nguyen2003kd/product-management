const express = require('express')
const route = express.Router();

const dashboardController = require('../../controllers/admin/dashboard.controller.js');
route.get("/", dashboardController.index);
module.exports = route;