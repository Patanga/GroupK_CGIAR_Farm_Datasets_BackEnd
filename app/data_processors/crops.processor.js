const {keysOfGroupingInProcessed, getSelectedRawData, getCountry,
  omitProperties} = require("./basic.processor.js");

const crop_consumed_kg_per_year = [
  "crop_consumed_kg_per_year_1",
  "crop_consumed_kg_per_year_2",
  "crop_consumed_kg_per_year_3",
  "crop_consumed_kg_per_year_4",
  "crop_consumed_kg_per_year_5",
  "crop_consumed_kg_per_year_6",
  "crop_consumed_kg_per_year_7",
  "crop_consumed_kg_per_year_8"
];
const crop_sold_kg_per_year = [
  "crop_sold_kg_per_year_1",
  "crop_sold_kg_per_year_2",
  "crop_sold_kg_per_year_3",
  "crop_sold_kg_per_year_4",
  "crop_sold_kg_per_year_5",
  "crop_sold_kg_per_year_6",
  "crop_sold_kg_per_year_7",
  "crop_sold_kg_per_year_8",
];

const crop_name = [
  "crop_name_1",
  "crop_name_2",
  "crop_name_3",
  "crop_name_4",
  "crop_name_5",
  "crop_name_6",
  "crop_name_7",
  "crop_name_8",
];
const crop_harvest_kg_per_year = [
  "crop_harvest_kg_per_year_1",
  "crop_harvest_kg_per_year_2",
  "crop_harvest_kg_per_year_3",
  "crop_harvest_kg_per_year_4",
  "crop_harvest_kg_per_year_5",
  "crop_harvest_kg_per_year_6",
  "crop_harvest_kg_per_year_7",
  "crop_harvest_kg_per_year_8",
];

let keysOfProcessed = [
  "landcultivated",
  "crops_all"
];
keysOfProcessed = keysOfProcessed.concat(keysOfGroupingInProcessed,
  crop_consumed_kg_per_year, crop_sold_kg_per_year, crop_name,
  crop_harvest_kg_per_year);

let keysOfIndicator = [
  "id_unique"
];


const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect; // export for test

let keysOfOmit = [
  "crops_all",
];
keysOfOmit = keysOfOmit.concat(crop_consumed_kg_per_year, crop_sold_kg_per_year,
  crop_name, crop_harvest_kg_per_year);


//
const combineAttributes = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getCountry(selectedDataObj),
      getAllCrops(selectedDataObj), getCropUsed(selectedDataObj)
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
/*               Functions for getting All Crops grown data                 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getAllCrops = (dataObj) => {
  const crops = dataObj.crops_all;
  let cropList = [];
  if (typeof (crops) === "string") {
    cropList = crops.trim().toLowerCase().split(/\s+/); // 正则匹配多个空格 wzj
  }

  return { api_crops_all: cropList};
};
exports.getAllCrops = getAllCrops; // export for test


const getCropUsed = (dataObj) => {
  const consumed1 = parseInt(dataObj.crop_consumed_kg_per_year_1) || 0;
  const consumed2 = parseInt(dataObj.crop_consumed_kg_per_year_2) || 0;

  const consumedAve = (consumed1+consumed2) / 8;

  const soldAve = 8;

  return {
    api_crop_consumed_kg_per_year: consumedAve,
    api_crop_sold_kg_per_year: soldAve
  };
};
exports.getCropUsed = getCropUsed;