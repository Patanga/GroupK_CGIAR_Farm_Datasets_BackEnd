const {keysOfGroupingInProcessed, getSelectedRawData, getGroupingData,
  omitProperties} = require("./basic.processor.js");

let keysOfProcessed = [
  "gps_lat",//个人
  "gps_lon",//个人
];
keysOfProcessed = keysOfProcessed.concat(keysOfGroupingInProcessed,);

let keysOfIndicator = [
  "id_unique"
];


const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect; // export for test

let keysOfOmit = [
];
keysOfOmit = keysOfOmit.concat();
exports.keysOfOmit = keysOfOmit;


//
const combineAttributes = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getGroupingData(selectedDataObj)
    );
    return omitProperties(newObj, keysOfOmit);
  });
};
exports.combineAttributes = combineAttributes;


exports.getDataForAPI = (indicatorDataList, processedDataList) => {
  const selectedDataList = getSelectedRawData(indicatorDataList, processedDataList,
    keysOfSelect);
  return combineAttributes(selectedDataList);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting  data            */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const get = (dataObj) => {
};
exports.get = get;


