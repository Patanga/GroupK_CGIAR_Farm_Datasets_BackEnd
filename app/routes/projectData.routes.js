module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const projectData = require("../controllers/projectData.controller.js");

    // Define REST APIs
    // Retrieve projectData by projectID
    router.get("/", projectData.findByProID);


    app.use("/api/project-data", router);
}