module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const data = require("../controllers/data.controller.js");
  const { getDashboardData, getGroupingLists } = require("../data_generator/dashboard_controller");
  const { updateDashboard } = require("../data_generator/generator");


  // Define REST APIs
  router.get("/all_pages", data.getAllPages);

  router.get("/home", data.getAllHomePage);

  // Livelihood
  router.get("/livelihood", data.getAllLivelihoods);
  router.get("/livelihood/tva", data.findTVA);
  router.get("/livelihood/income_cat", data.findIncomeCat);
  router.get("/livelihood/annual_value", data.findAnnualValue);

  router.get("/food_security", data.getAllFoodSecurity);
  router.get("/food_security/hfias", data.findHFIAS);
  router.get("/food_security/food_shortage", data.findFoodShortage);
  router.get("/food_security/hdds", data.findHDDS);
  router.get("/food_security/food_consumed", data.findFoodConsumed);

  router.get("/crops", data.getAllCrops);

  router.get("/livestock", data.getAllLivestock);
  router.get("/livestock/frequency", data.findFrequency);
  router.get("/livestock/heads", data.findHeads);

  router.get("/off_farm", data.getAllOffFarm);


  // Retrieve data by dataType
  router.get("/raw_data/:datatype", data.findRawDataByDataType);


  // Experimental dashboard api
  router.get("/dashboard/groupinglists", getGroupingLists);
  router.get("/dashboard", getDashboardData);
  router.get("/dashboard/update", updateDashboard);


  app.use("/api/data", router);
}
