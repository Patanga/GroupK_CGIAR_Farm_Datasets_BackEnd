
// Get Schema
const projectData = require("../models/projectData.model.js");

// Retrieve projectData by projectID from the database.
exports.findByProID = (req, res) => {
    const projectID = req.query.projectid;
    let condition = projectID ? {projectID: projectID} : {};
    projectData.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(
                {message: err.message || "Some error occurred while retrieving projectData."}
            );
        });
};

