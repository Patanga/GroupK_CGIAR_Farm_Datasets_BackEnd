const group = require("./grouping.processor.js");

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
  "id_unique",

  "crops_all"
];
keysOfProcessed = keysOfProcessed.concat(group.keysOfGroupingInProcessed,
  crop_consumed_kg_per_year, crop_sold_kg_per_year, crop_name,
  crop_harvest_kg_per_year);

let keysOfIndicator = [
  "id_unique",

  "land_cultivated_ha"
];


// Define which original keys to be selected
const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect;


// Define which original keys to be omitted
let keysOfOmit = [
  "crops_all",
  "land_cultivated_ha"
];
keysOfOmit = keysOfOmit.concat(crop_consumed_kg_per_year, crop_sold_kg_per_year,
  crop_name, crop_harvest_kg_per_year);
exports.keysOfOmit = keysOfOmit;


// Define how to transform original keys to API keys
const getAPIKeys = (dataObj) => {
  let newObj = {};
  Object.assign(newObj, group.getAPIKeys(dataObj), getAllCrops(dataObj),
    getCropUsed(dataObj), getCropYields(dataObj), getCropLand(dataObj));
  return newObj;
};
exports.getAPIKeys = getAPIKeys;


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
  const name1 = dataObj.crop_name_1;
  const name2 = dataObj.crop_name_2;
  const name3 = dataObj.crop_name_3;
  const name4 = dataObj.crop_name_4;
  const name5 = dataObj.crop_name_5;
  const name6 = dataObj.crop_name_6;
  const name7 = dataObj.crop_name_7;
  const name8 = dataObj.crop_name_8;
  const consumed1 = dataObj.crop_consumed_kg_per_year_1;
  const consumed2 = dataObj.crop_consumed_kg_per_year_2;
  const consumed3 = dataObj.crop_consumed_kg_per_year_3;
  const consumed4 = dataObj.crop_consumed_kg_per_year_4;
  const consumed5 = dataObj.crop_consumed_kg_per_year_5;
  const consumed6 = dataObj.crop_consumed_kg_per_year_6;
  const consumed7 = dataObj.crop_consumed_kg_per_year_7;
  const consumed8 = dataObj.crop_consumed_kg_per_year_8;
  const sold1 = dataObj.crop_sold_kg_per_year_1;
  const sold2 = dataObj.crop_sold_kg_per_year_2;
  const sold3 = dataObj.crop_sold_kg_per_year_3;
  const sold4 = dataObj.crop_sold_kg_per_year_4;
  const sold5 = dataObj.crop_sold_kg_per_year_5;
  const sold6 = dataObj.crop_sold_kg_per_year_6;
  const sold7 = dataObj.crop_sold_kg_per_year_7;
  const sold8 = dataObj.crop_sold_kg_per_year_8;
  var api_consumed_sold1 = [];
  var api_consumed_sold2 = [];
  var api_consumed_sold3 = [];
  var api_consumed_sold4 = [];
  var api_consumed_sold5 = [];
  var api_consumed_sold6 = [];
  var api_consumed_sold7 = [];
  var api_consumed_sold8 = [];
  if(typeof (name1) === "string"&&typeof (consumed1) === "string"&&typeof (sold1) === "string"&&parseFloat(consumed1)>=0&&parseFloat(sold1)>=0){
    api_consumed_sold1.push(name1);
    api_consumed_sold1.push(parseFloat(consumed1));
    api_consumed_sold1.push(parseFloat(sold1));
  }
  if(typeof (name2) === "string"&&typeof (consumed2) === "string"&&typeof (sold2) === "string"&&parseFloat(consumed2)>=0&&parseFloat(sold2)>=0){
    api_consumed_sold2.push(name2);
    api_consumed_sold2.push(parseFloat(consumed2));
    api_consumed_sold2.push(parseFloat(sold2));
  }
  if(typeof (name3) === "string"&&typeof (consumed3) === "string"&&typeof (sold3) === "string"&&parseFloat(consumed3)>=0&&parseFloat(sold3)>=0){
    api_consumed_sold3.push(name3);
    api_consumed_sold3.push(parseFloat(consumed3));
    api_consumed_sold3.push(parseFloat(sold3));
  }
  if(typeof (name4) === "string"&&typeof (consumed4) === "string"&&typeof (sold4) === "string"&&parseFloat(consumed4)>=0&&parseFloat(sold4)>=0){
    api_consumed_sold4.push(name4);
    api_consumed_sold4.push(parseFloat(consumed4));
    api_consumed_sold4.push(parseFloat(sold4));
  }
  if(typeof (name5) === "string"&&typeof (consumed5) === "string"&&typeof (sold5) === "string"&&parseFloat(consumed5)>=0&&parseFloat(sold5)>=0){
    api_consumed_sold5.push(name5);
    api_consumed_sold5.push(parseFloat(consumed5));
    api_consumed_sold5.push(parseFloat(sold5));
  }
  if(typeof (name6) === "string"&&typeof (consumed6) === "string"&&typeof (sold6) === "string"&&parseFloat(consumed6)>=0&&parseFloat(sold6)>=0){
    api_consumed_sold6.push(name6);
    api_consumed_sold6.push(parseFloat(consumed6));
    api_consumed_sold6.push(parseFloat(sold6));
  }
  if(typeof (name7) === "string"&&typeof (consumed7) === "string"&&typeof (sold7) === "string"&&parseFloat(consumed7)>=0&&parseFloat(sold7)>=0){
    api_consumed_sold7.push(name7);
    api_consumed_sold7.push(parseFloat(consumed7));
    api_consumed_sold7.push(parseFloat(sold7));
  }
  if(typeof (name8) === "string"&&typeof (consumed8) === "string"&&typeof (sold8) === "string"&&parseFloat(consumed8)>=0&&parseFloat(sold8)>=0){
    api_consumed_sold8.push(name8);
    api_consumed_sold8.push(parseFloat(consumed8));
    api_consumed_sold8.push(parseFloat(sold8));
  }
  return{api_consumed_sold1,api_consumed_sold2,api_consumed_sold3,api_consumed_sold4,api_consumed_sold5,api_consumed_sold6,api_consumed_sold7,api_consumed_sold8};

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
  var api_name_yield1 = [];
  var api_name_yield2 = [];
  var api_name_yield3 = [];
  var api_name_yield4 = [];
  var api_name_yield5 = [];
  var api_name_yield6 = [];
  var api_name_yield7 = [];
  var api_name_yield8 = [];
  if(typeof (name1) === "string"&&typeof (harvest1) === "string"&&parseFloat(harvest1)>=0){
    api_name_yield1.push(name1);
    api_name_yield1.push(parseFloat(harvest1));
  }
  if(typeof (name2) === "string"&&typeof (harvest2) === "string"&&parseFloat(harvest2)>=0){
    api_name_yield2.push(name2);
    api_name_yield2.push(parseFloat(harvest2));
  }
  if(typeof (name3) === "string"&&typeof (harvest3) === "string"&&parseFloat(harvest3)>=0){
    api_name_yield3.push(name3);
    api_name_yield3.push(parseFloat(harvest3));
  }
  if(typeof (name4) === "string"&&typeof (harvest4) === "string"&&parseFloat(harvest4)>=0){
    api_name_yield4.push(name4);
    api_name_yield4.push(parseFloat(harvest4));
  }
  if(typeof (name5) === "string"&&typeof (harvest5) === "string"&&parseFloat(harvest5)>=0){
    api_name_yield5.push(name5);
    api_name_yield5.push(parseFloat(harvest5));
  }
  if(typeof (name6) === "string"&&typeof (harvest6) === "string"&&parseFloat(harvest6)>=0){
    api_name_yield6.push(name6);
    api_name_yield6.push(parseFloat(harvest6));
  }
  if(typeof (name7) === "string"&&typeof (harvest7) === "string"&&parseFloat(harvest7)>=0){
    api_name_yield7.push(name7);
    api_name_yield7.push(parseFloat(harvest7));
  }
  if(typeof (name8) === "string"&&typeof (harvest8) === "string"&&parseFloat(harvest8)>=0){
    api_name_yield8.push(name8);
    api_name_yield8.push(parseFloat(harvest8));
  }
  return {api_name_yield1,api_name_yield2,api_name_yield3,api_name_yield4,api_name_yield5,api_name_yield6,api_name_yield7,api_name_yield8 }
};
exports.getCropYields = getCropYields; // export for test

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting Crop Land data                 */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getCropLand = (dataObj) => {
  let landArea = null;
  if (typeof (dataObj.land_cultivated_ha)==="string"){
    landArea = parseFloat(dataObj.land_cultivated_ha);
    if (landArea < 0) {
      landArea = null;
    }
  }
  return {api_landArea: landArea};
};
exports.getCropLand = getCropLand;