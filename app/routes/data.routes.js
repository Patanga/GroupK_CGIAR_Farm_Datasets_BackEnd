const data = require("../controllers/data.controller");
module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const data = require("../controllers/data.controller.js");
  
  // Define REST APIs
  // Retrieve data by dataType
  router.get("/raw_data/:datatype", data.findRawDataByDataType);

  router.get("/food_security", data.getAllFoodSecurity);

  router.get("/food_security/hfias", data.findHFIAS);

  router.get("/food_security/food_shortage");

  router.get("/food_security/hdds");

  router.get("/food_security/food_consumed");

  // Huiying's
  router.get("/livestock/livestock_all", data.getLivestockAll);

  router.get("/livestock/livestock_kept_frequency", data.getLivestockKeptFrequency);

  router.get("/livestock/use_of_products", data.getUseOfProducts);

  router.get("/livestock/improved_breeds", data.getImprovedBreeds);


  app.use("/api/data", router);
}
