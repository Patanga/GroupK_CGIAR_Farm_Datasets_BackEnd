const {keysOfGroupingInProcessed, getSelectedRawData, getGroupingData,
  omitProperties} = require("./basic.processor.js");
const foodSecProcessor = require("./foodSecurity.processor");
const livestockProcessor = require("./livestock.processor");
const liveProcessor = require("./livelihoods.processor");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*                         Building all keys                                */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const keysOfFoodSec = foodSecProcessor.keysOfSelect;
const keysOfLivestock = livestockProcessor.keysOfSelect;
const keysOfLivelihoods = liveProcessor.keysOfSelect;

let keysOfProcessed = new Set([...keysOfGroupingInProcessed,
  ...keysOfLivelihoods.processed, ...keysOfFoodSec.processed,
  ...keysOfLivestock.processed
]);

let keysOfIndicator = new Set([...keysOfLivelihoods.indicator,
  ...keysOfFoodSec.indicator, ...keysOfLivestock.indicator
]);

let tmpKeysOfOmit = new Set([...liveProcessor.keysOfOmit,
  ...foodSecProcessor.keysOfOmit, ...livestockProcessor.keysOfOmit
]);


const keysOfSelect = {
  indicator: Array.from(keysOfIndicator),
  processed: Array.from(keysOfProcessed)
};
exports.keysOfSelect = keysOfSelect; // export for test

const keysOfOmit = Array.from(tmpKeysOfOmit);
exports.keysOfOmit = keysOfOmit; // export for test


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*              Building functions for combining attributes                 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getLivelihoods = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, liveProcessor.calAppendIncome(dataObj) );
  return newObj;
}

const getFoodSecData = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, foodSecProcessor.getHFIAS(dataObj),
    foodSecProcessor.getFoodShortage(dataObj),
    foodSecProcessor.getFoodConsumedAndHDDS(dataObj) );
  return newObj;
};

const getLivestockData = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, livestockProcessor.getLivestockFrequency(dataObj),
    livestockProcessor.getLivestockUse(dataObj),
    livestockProcessor.getLivestockBreeds(dataObj));
  return newObj;
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*                        Building data for API                             */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const combineAttributes = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getGroupingData(selectedDataObj),
      getLivelihoods(selectedDataObj), getFoodSecData(selectedDataObj),
      getLivestockData(selectedDataObj)
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
