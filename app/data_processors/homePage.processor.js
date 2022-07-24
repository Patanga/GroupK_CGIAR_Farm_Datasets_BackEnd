const group = require("./grouping.processor.js");

let keysOfProcessed = [
  "id_unique",

  "gps_lat",//个人
  "gps_lon",//个人
];
keysOfProcessed = keysOfProcessed.concat(group.keysOfGroupingInProcessed);

let keysOfIndicator = [
  "id_unique"
];


// Define which original keys to be selected
const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect;


// Define which original keys to be omitted
let keysOfOmit = [
  "gps_lat",
  "gps_lon",
];
keysOfOmit = keysOfOmit.concat();
exports.keysOfOmit = keysOfOmit;


// Define how to transform original keys to API keys
const getAPIKeys = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, group.getAPIKeys(dataObj),getGps(dataObj));
  return newObj;
};
exports.getAPIKeys = getAPIKeys;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting  data            */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getGps = (dataObj) => {
  var gpslat=Number(dataObj.gps_lat);
  var gpslon=Number(dataObj.gps_lon);
  return {api_gps:[gpslat,gpslon]}

};
exports.getGps = getGps;
