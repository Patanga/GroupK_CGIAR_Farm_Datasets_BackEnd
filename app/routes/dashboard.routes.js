module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const dashboard = require("../controllers/dashboard.controller");


  // Define REST APIs
  // Experimental dashboard api
  router.get("/groupinglists", dashboard.getGroupingLists);
  router.get("/", dashboard.getDashboardData);
  router.get("/update", dashboard.updateDashboard);


  app.use("/api/dashboard", router);
}