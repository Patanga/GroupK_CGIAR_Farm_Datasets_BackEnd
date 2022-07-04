const group = require("./grouping.processor.js");

const foodConsumedGoodSeason = [
  "grainsrootstubers_good_season",
  "legumes_good_season",
  "nuts_seeds_good_season",
  "veg_leafy_good_season",
  "vita_veg_fruit_good_season",
  "vegetables_good_season",
  "fruits_good_season",
  "meat_good_season",
  "milk_dairy_good_season",
  "eggs_good_season",

  "grains_good_season",
  "roots_tubers_good_season",

  "pulses_good_season",

  "milk_good_season",

  "organ_meat_good_season",
  "meat_poultry_good_season",
  "fish_seafood_good_season",

  "green_veg_good_season",

  "vita_veg_good_season",
  "vita_fruits_good_season",

  "other_veg_good_season",

  "other_fruits_good_season"
];
exports.foodConsumedGoodSeason = foodConsumedGoodSeason; // export for test
const foodConsumedBadSeason = [
  "grainsrootstubers_bad_season",
  "legumes_bad_season",
  "veg_leafy_bad_season",
  "vita_veg_fruit_bad_season",
  "vegetables_bad_season",
  "fruits_bad_season",
  "meat_bad_season",
  "milk_dairy_bad_season",
  "grains_bad_season",
  "roots_tubers_bad_season",
  "pulses_bad_season",
  "nuts_seeds_bad_season",
  "milk_bad_season",
  "organ_meat_bad_season",
  "meat_poultry_bad_season",
  "fish_seafood_bad_season",
  "eggs_bad_season",
  "green_veg_bad_season",
  "vita_veg_bad_season",
  "vita_fruits_bad_season",
  "other_veg_bad_season",
  "other_fruits_bad_season"
];
exports.foodConsumedBadSeason = foodConsumedBadSeason; // export for test
const foodConsumedLastMonth = [
  "grainsrootstubers_last_month",
  "legumes_last_month",
  "veg_leafy_last_month",
  "vita_veg_fruit_last_month",
  "vegetables_last_month",
  "fruits_last_month",
  "meat_last_month",
  "milk_dairy_last_month",
  "grains_last_month",
  "roots_tubers_last_month",
  "pulses_last_month",
  "nuts_seeds_last_month",
  "milk_last_month",
  "organ_meat_last_month",
  "meat_poultry_last_month",
  "fish_seafood_last_month",
  "eggs_last_month",
  "green_veg_last_month",
  "vita_veg_last_month",
  "vita_fruits_last_month",
  "other_veg_last_month",
  "other_fruits_last_month"
];
exports.foodConsumedLastMonth = foodConsumedLastMonth; // export for test

let keysOfProcessed = [
  "id_unique",

  "foodshortagetime_months_which"
];
keysOfProcessed = keysOfProcessed.concat(group.keysOfGroupingInProcessed,
  foodConsumedGoodSeason, foodConsumedBadSeason, foodConsumedLastMonth);

let keysOfIndicator = [
  "id_unique",

  "hfias_status",
  "fies_score",
  "hdds_good_season",
  "hdds_bad_season",
  "hdds_last_month"
];


// Define which original keys to be selected
const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect;


// Define which original keys to be omitted
let keysOfOmit = [
  "foodshortagetime_months_which",
  "hfias_status",
  "fies_score",
  "hdds_good_season",
  "hdds_bad_season",
  "hdds_last_month"
];
keysOfOmit = keysOfOmit.concat(foodConsumedGoodSeason,
  foodConsumedBadSeason, foodConsumedLastMonth);
exports.keysOfOmit = keysOfOmit;


// Define how to transform original keys to API keys
const getAPIKeys = (dataObj) => {
  let newObj = {};
  Object.assign(newObj, group.getAPIKeys(dataObj), getHFIAS(dataObj),
    getFoodShortage(dataObj), getFoodConsumedAndHDDS(dataObj));
  return newObj;
};
exports.getAPIKeys = getAPIKeys;


const months = ["jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec"];

const foodGroupMap = {
  grainsrootstubers: "grainsrootstubers",
  legumes: "legumes",
  nuts_seeds: "nuts_seeds",
  veg_leafy: "veg_leafy",
  vita_veg_fruit: "vita_veg_fruit",
  vegetables: "vegetables",
  fruits: "fruits",
  meat: "meat",
  milk_dairy: "milk_dairy",
  eggs: "eggs",

  grains: "grainsrootstubers",
  roots_tubers: "grainsrootstubers",
  pulses: "legumes",
  milk: "milk_dairy",
  organ_meat: "meat",
  meat_poultry: "meat",
  fish_seafood: "meat",
  green_veg: "veg_leafy",
  vita_veg: "vita_veg_fruit",
  vita_fruits: "vita_veg_fruit",
  other_veg: "vegetables",
  other_fruits: "fruits"
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*            Functions for getting FoodConsumed and HDDS data              */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getFoodConsumedAndHDDS = (dataObj) => {
  let goodSeason = findFoodGroup(foodConsumedGoodSeason, dataObj);
  let badSeason = findFoodGroup(foodConsumedBadSeason, dataObj);
  if (goodSeason.length === 0) {
    goodSeason = findFoodGroup(foodConsumedLastMonth, dataObj);
  }
  if (badSeason.length === 0) {
    badSeason = findFoodGroup(foodConsumedLastMonth, dataObj);
  }
  const foodFlush = transformFoodGroupType(goodSeason);
  const foodLean = transformFoodGroupType(badSeason);

  let HDDSFlush = parseInt(dataObj.hdds_good_season) || parseInt(dataObj.hdds_last_month);
  let HDDSLean = parseInt(dataObj.hdds_bad_season) || parseInt(dataObj.hdds_last_month);
  // 同时为null，则取-1   wzj
  if (isNaN(HDDSFlush) && isNaN(HDDSLean)) {
    HDDSFlush = -1;
    HDDSLean = -1;
  }
  // 不同时为null，则采用   wzj
  if (isNaN(HDDSFlush) && !isNaN(HDDSLean)) {
    HDDSFlush = foodFlush.length;
  }
  if (isNaN(HDDSLean) && !isNaN(HDDSFlush)) {
    HDDSLean = foodLean.length;
  }

  return {
    api_hdds_flush: HDDSFlush,
    api_hdds_lean: HDDSLean,
    api_food_flush: foodFlush,
    api_food_lean: foodLean
  };
};
exports.getFoodConsumedAndHDDS = getFoodConsumedAndHDDS; // export for test


const findFoodGroup = (foodList, dataObj) => {
  let result = [];
  foodList.forEach(food => {
    let frequency = dataObj[food] || "";
    frequency = frequency.toLowerCase();
    if (frequency === "daily" || frequency === "weekly") {
      result.push(funcGetFoodName(food));
    }
  });
  return result;
};
exports.findFoodGroup = findFoodGroup; // export for test

const transformFoodGroupType = (foodList) => {
  let result = new Set();
  foodList.forEach(food => {
    result.add(foodGroupMap[food]);
  });
  return Array.from(result);
};
exports.transformFoodGroupType = transformFoodGroupType; // export for test

const funcGetFoodName = (foodStr) => {
  let tmpList = foodStr.split("_");
  tmpList.pop();
  tmpList.pop();
  return tmpList.join("_");
};
exports.funcGetFoodName = funcGetFoodName; // export for test


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*                 Functions for getting FoodShortage data                  */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getFoodShortage = (dataObj) => {
  const monthsStr = dataObj.foodshortagetime_months_which;
  let monthList = [];
  if (typeof (monthsStr) === "string") {
    let tmpList = monthsStr.trim().toLowerCase().split(/\s+/); // 正则匹配多个空格 wzj
    monthList = tmpList.filter(month => months.includes(month));
    monthList = monthList.map(month => funcTitleCase(month));
  }

  return { api_food_shortage_months: monthList };
};
exports.getFoodShortage = getFoodShortage; // export for test


const funcTitleCase = (str) => {
  return str.replace(/^[a-z]/, L => L.toUpperCase());
};
exports.funcTitleCase = funcTitleCase; // export for test


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*                    Functions for getting HFIAS data                      */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getHFIAS = (dataObj) => {
  let fiesScore = parseInt(dataObj.fies_score);
  let hfiasTmp = dataObj.hfias_status;
  let hfiasStatus;
  if (!isNaN(fiesScore)) {
    if (fiesScore === 0) {
      hfiasStatus = "food_secure";
    } else if (fiesScore === 1) {
      hfiasStatus = "mildly_fi";
    } else if (fiesScore >= 2 && fiesScore <= 4) {
      hfiasStatus = "moderately_fi";
    } else if (fiesScore > 4) {
      hfiasStatus = "severely_fi";
    } else {
      hfiasStatus = isStandardHFIAS(hfiasTmp) ? hfiasTmp.toLowerCase() : null;
    }
  } else {
    hfiasStatus = isStandardHFIAS(hfiasTmp) ? hfiasTmp.toLowerCase() : null;
  }

  return { api_hfias_status: hfiasStatus };
}
exports.getHFIAS = getHFIAS; // export for test


const isStandardHFIAS = (string) => {
  if (typeof (string) !== "string") {
    return false;
  }
  const standardHFIAS = [
    "food_secure",
    "mildly_fi",
    "moderately_fi",
    "severely_fi",
  ];
  return standardHFIAS.includes(string.toLowerCase());
}
exports.isStandardHFIAS = isStandardHFIAS; // export for test
