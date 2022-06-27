const foodSecurity = require("./foodSecurity.js");
const dataProcessor = require("./dataProcessor.js");

// Get Schema
const data = require("../models/data.model.js");


// Retrieve data by condition from the MongoDB database
// Must have dataType !!
const getRawData = async (dataType, project, form) => {
  const projectID = project || {$ne: undefined};
  const formID = form || {$ne: undefined};
  let condition = {dataType: dataType, projectID: projectID, formID: formID};

  let resultData = await data.find(condition);
  console.log(resultData.length + " records of " + dataType); // wzj
  return resultData;
};

//
const buildAPIData = async (project, form) => {
  const indicatorDataList = await getRawData("indicator_data", project, form);
  const processedDataList = await getRawData("processed_data", project, form);
  const selectedRawData = dataProcessor.getSelectedRawData(indicatorDataList, processedDataList);
  const dataForAPI = dataProcessor.getDataForAPI(selectedRawData)
  console.log(dataForAPI.length + ": APIData"); // wzj
  return dataForAPI;
};


// Retrieve data by dataType
exports.findRawDataByDataType = (req, res) => {
  const dataType = req.params.datatype;
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  getRawData(dataType, projectID, formID)
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

//
exports.getAllFoodSecurity = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData(projectID, formID)
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

  buildAPIData(projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecurity.count(data, "HFIAS"));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findFoodShortage = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData(projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecurity.buildFoodShortageData(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findHDDS = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData(projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecurity.buildHDDSData(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findFoodConsumed = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData(projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecurity.buildFoodConsumedData(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

