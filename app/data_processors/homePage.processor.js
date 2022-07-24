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
];
keysOfOmit = keysOfOmit.concat();
exports.keysOfOmit = keysOfOmit;


// Define how to transform original keys to API keys
const getAPIKeys = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, group.getAPIKeys(dataObj));
  return newObj;
};
exports.getAPIKeys = getAPIKeys;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting  data            */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const get = (dataObj) => {
};
exports.get = get;


