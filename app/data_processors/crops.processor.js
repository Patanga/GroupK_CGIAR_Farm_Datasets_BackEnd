const {keysOfGroupingInProcessed, getSelectedRawData, getGroupingData,
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
  "crops_all"
];
keysOfProcessed = keysOfProcessed.concat(keysOfGroupingInProcessed,
  crop_consumed_kg_per_year, crop_sold_kg_per_year, crop_name,
  crop_harvest_kg_per_year);

let keysOfIndicator = [
  "id_unique",
  "land_cultivated_ha"
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
exports.keysOfOmit = keysOfOmit;


//
const combineAttributes = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getGroupingData(selectedDataObj),
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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting Crop used data                 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getCropUsed = (dataObj) => {
  const consumed1 = parseInt(dataObj.crop_consumed_kg_per_year_1) || 0;
  const consumed2 = parseInt(dataObj.crop_consumed_kg_per_year_2) || 0;
  const consumed3 = parseInt(dataObj.crop_consumed_kg_per_year_3) || 0;
  const consumed4 = parseInt(dataObj.crop_consumed_kg_per_year_4) || 0;
  const consumed5 = parseInt(dataObj.crop_consumed_kg_per_year_5) || 0;
  const consumed6 = parseInt(dataObj.crop_consumed_kg_per_year_6) || 0;
  const consumed7 = parseInt(dataObj.crop_consumed_kg_per_year_7) || 0;
  const consumed8 = parseInt(dataObj.crop_consumed_kg_per_year_8) || 0;

  const sold1 = parseInt(dataObj.crop_sold_kg_per_year_1) || 0;
  const sold2 = parseInt(dataObj.crop_sold_kg_per_year_2) || 0;
  const sold3 = parseInt(dataObj.crop_sold_kg_per_year_3) || 0;
  const sold4 = parseInt(dataObj.crop_sold_kg_per_year_4) || 0;
  const sold5 = parseInt(dataObj.crop_sold_kg_per_year_5) || 0;
  const sold6 = parseInt(dataObj.crop_sold_kg_per_year_6) || 0;
  const sold7 = parseInt(dataObj.crop_sold_kg_per_year_7) || 0;
  const sold8 = parseInt(dataObj.crop_sold_kg_per_year_8) || 0;

  const consumedAve = (consumed1+consumed2+consumed3+consumed4+consumed5+consumed6+consumed7+consumed8) / 8;
  const soldAve = (sold1+sold2+sold3+sold4+sold5+sold6+sold7+sold8) / 8;

  return {
    api_crop_consumed_kg_per_year: consumedAve,
    api_crop_sold_kg_per_year: soldAve
  };
};
exports.getCropUsed = getCropUsed;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting Crop yields data                 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getCropYields = (dataObj) => {
  var name1 = dataObj.crop_name_1;
  var name2 = dataObj.crop_name_2;
  var name3 = dataObj.crop_name_3;
  var name4 = dataObj.crop_name_4;
  var name5 = dataObj.crop_name_5;
  var name6 = dataObj.crop_name_6;
  var name7 = dataObj.crop_name_7;
  var name8 = dataObj.crop_name_8;
  var harvest1 = dataObj.crop_harvest_kg_per_year_1;
  var harvest2 = dataObj.crop_harvest_kg_per_year_2;
  var harvest3 = dataObj.crop_harvest_kg_per_year_3;
  var harvest4 = dataObj.crop_harvest_kg_per_year_4;
  var harvest5 = dataObj.crop_harvest_kg_per_year_5;
  var harvest6 = dataObj.crop_harvest_kg_per_year_6;
  var harvest7 = dataObj.crop_harvest_kg_per_year_7;
  var harvest8 = dataObj.crop_harvest_kg_per_year_8;
  let arr1 = [];
  let arr2 = [];
  let arr3 = [];
  let arr4 = [];
  let arr5 = [];
  let arr6 = [];
  let arr7 = [];
  let arr8 = [];
  if(typeof (name1) === "string"&&typeof (harvest1) === "number"&&harvest1>=0){
    arr1 = [name1,harvest1];
  }
  if(typeof (name2) === "string"&&typeof (harvest2) === "number"&&harvest2>=0){
    arr2 = [name2,harvest2];
  }
  if(typeof (name3) === "string"&&typeof (harvest3) === "number"&&harvest3>=0){
    arr3 = [name3,harvest3];
  }
  if(typeof (name4) === "string"&&typeof (harvest4) === "number"&&harvest4>=0){
    arr4 = [name4,harvest4];
  }
  if(typeof (name5) === "string"&&typeof (harvest5) === "number"&&harvest5>=0){
    arr5 = [name5,harvest5];
  }
  if(typeof (name6) === "string"&&typeof (harvest6) === "number"&&harvest6>=0){
    arr6 = [name6,harvest6];
  }
  if(typeof (name7) === "string"&&typeof (harvest7) === "number"&&harvest7>=0){
    arr7 = [name7,harvest7];
  }
  if(typeof (name8) === "string"&&typeof (harvest8) === "number"&&harvest8>=0){
    arr8 = [name8,harvest8];
  }
   return {arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8 }
};
exports.getCropYields = getCropYields; // export for test

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting Crop Land data                 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getCropLand = (dataObj) => {
  let landArea = [];
  if(Number.isFinite(dataObj.land_cultivated_ha)&&dataObj.land_cultivated_ha>=0){
    landArea = dataObj.land_cultivated_ha
  }
  return {landArea};
};
exports.getCropLand = getCropLand;