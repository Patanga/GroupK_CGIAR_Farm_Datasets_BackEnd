const foodSecurity = require("./foodSecurity.js");
const dataProcessor = require("./dataProcessor.js");

// Get Schema
const data = require("../models/data.model.js");


// Retrieve data by condition from the MongoDB database
// Must have dataType !!
const getData = async (dataType, project, form) => {
  const projectID = project || {$ne: undefined};
  const formID = form || {$ne: undefined};
  let condition = {dataType: dataType, projectID: projectID, formID: formID};

  let resultData = await data.find(condition);
  console.log(resultData.length + " records of " + dataType); // wzj
  return resultData;
};

//
const getRawData = async (project, form) => {
  const indicatorDataList = await getData("indicator_data", project, form);
  const processedDataList = await getData("processed_data", project, form);
  const rawData = dataProcessor.getRawData(indicatorDataList, processedDataList);
  console.log(rawData.length + ": getRawData"); // wzj
  return rawData;
};


// Retrieve data by dataType
exports.findDataByDataType = (req, res) => {
  const dataType = req.params.datatype;
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  getData(dataType, projectID, formID)
    .then(data => {
      console.log(data.length + ": findDataByDataType"); // wzj
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.getAllFoodSecurity = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  getRawData(projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    })
};

//
exports.findHFIAS = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  getData("indicator_data", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecurity.count(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

