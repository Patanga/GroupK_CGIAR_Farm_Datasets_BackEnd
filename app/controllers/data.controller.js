const processor = require("../data_processors/all.index");
const home = require("../data_calculators/home.calculator");
const livelihood = require("../data_calculators/livelihood.calculator");
const foodSecCalculator = require("../data_calculators/foodSecurity.calculator.js");
const livestockCalculator = require("../data_calculators/livestock.calculator");
const offfarm = require("../data_calculators/offfarm.calculator");
const crops = require("../data_calculators/crops.calculator");


// Get Schema
const data = require("../models/data.model.js");


// Retrieve raw data by condition from the MongoDB database
// Must have dataType !!
const getRawData = async (dataType, project, form) => {
  const projectID = project || {$ne: undefined};
  const formID = form || {$ne: undefined};
  let condition = {dataType: dataType, projectID: projectID, formID: formID};

  let resultData = await data.find(condition);
  console.log(resultData.length + " records of " + dataType); // wzj
  return resultData;
};


// Build API data from raw data
// Must choose which type of page !!
const buildAPIData = async (pageType, project, form) => {
  const indicatorDataList = await getRawData("indicator_data", project, form);
  const processedDataList = await getRawData("processed_data", project, form);
  const dataForAPI = processor.getDataForAPI(pageType, indicatorDataList, processedDataList);
  console.log(dataForAPI.length + ": APIData of " + pageType); // wzj
  return dataForAPI;
};
// Export for dashboard_generator of Cached DB
exports.buildAPIData = buildAPIData;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*              Functions for getting API data for All Pages                */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
exports.getAllPages = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("allPages", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting API data for Home Page               */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
exports.getAllHomePage = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("home", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findGps=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("home", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(home.buildHomeMap(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*          Functions for getting API data for Livelihoods Page             */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
exports.getAllLivelihoods = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livelihoods", projectID, formID)
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


// Livelihood by EYang
exports.findTVA = (req,res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livelihoods", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(livelihood.buildTVA(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findIncomeCat = (req,res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livelihoods", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(livelihood.buildIncomeCat(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findAnnualValue = (req,res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livelihoods", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(livelihood.buildAnnualValue(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*          Functions for getting API data for Food Security Page           */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
exports.getAllFoodSecurity = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("foodSecurity", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

//
exports.findHFIAS = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("foodSecurity", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecCalculator.count(data, "HFIAS"));
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

  buildAPIData("foodSecurity", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecCalculator.buildFoodShortageData(data));
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

  buildAPIData("foodSecurity", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecCalculator.buildHDDSData(data));
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

  buildAPIData("foodSecurity", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(foodSecCalculator.buildFoodConsumedData(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*              Functions for getting API data for Crops Page               */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
exports.getAllCrops = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("crops", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findCropLand=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("crops", projectID, formID)
    .then(data => {
      console.log(data.length); // pzz
      res.send(crops.buildCropLand(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findCropGrown=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("crops", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(crops.buildCropGrown(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findCropUsed=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("crops", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(crops.buildCropUsed(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findCropYields=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("crops", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(crops.buildCropYields(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*            Functions for getting API data for Livestock Page             */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
exports.getAllLivestock = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livestock", projectID, formID)
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
exports.findLsFrequency = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livestock", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(livestockCalculator.count(data, "Frequency"));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findLsHeads = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livestock", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(livestockCalculator.buildHeadsData(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findLsUsages = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livestock", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(livestockCalculator.buildUseData(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findLsBreeds = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("livestock", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(livestockCalculator.buildBreedsData(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*            Functions for getting API data for Off Farm Page              */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
exports.getAllOffFarm = (req, res) => {
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("offFarm", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
};

exports.findOffFarmIncome=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("offFarm", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(offfarm.buildOfffarmIncome(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findOffFarmMonth=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("offFarm", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(offfarm.buildOfffarmMonth(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findOffFarmActivity=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("offFarm", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(offfarm.buildOfffarmActivity(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}

exports.findOffFarmUsage=(req,res)=>{
  const projectID = req.query.projectid;
  const formID = req.query.formid;

  buildAPIData("offFarm", projectID, formID)
    .then(data => {
      console.log(data.length); // wzj
      res.send(offfarm.buildOfffarmUsage(data));
    })
    .catch(err => {
      res.status(500).send(
        {message: err.message || "Some error occurred while retrieving data."}
      );
    });
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*             Functions for retrieving raw data by dataType                */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
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
