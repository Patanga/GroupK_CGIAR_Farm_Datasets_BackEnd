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

const keysOfIndicator = [
  "id_unique",

  "hfias_status",
  "fies_score",
  "hdds_good_season",
  "hdds_bad_season",
  "hdds_last_month"
];

let keysOfProcessed = [
  "id_unique",
  "id_country",
  "region",
  "id_proj",
  "id_form",

  "foodshortagetime_months_which"
];
keysOfProcessed = keysOfProcessed.concat(foodConsumedGoodSeason,
  foodConsumedBadSeason,foodConsumedLastMonth);

let keysOfOmit = [
  "foodshortagetime_months_which",
  "hfias_status",
  "fies_score",
  "hdds_good_season",
  "hdds_bad_season",
  "hdds_last_month"
];
keysOfOmit = keysOfOmit.concat(foodConsumedGoodSeason,
  foodConsumedBadSeason,foodConsumedLastMonth);

const months = [ "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec" ];

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


//
exports.getSelectedRawData = (indicatorDataList, processedDataList) => {
  let dataListOfIndicator = indicatorDataList.map(indicatorData => indicatorData.data);
  let rawDataOfIndicator = dataListOfIndicator.map(data => pickProperties(data, keysOfIndicator));
  let idListOfIndicator = rawDataOfIndicator.map(data => data.id_unique);

  let dataListOfProcessed = processedDataList.map(processedData => processedData.data);
  let rawDataOfProcessed = dataListOfProcessed.map(data => pickProperties(data, keysOfProcessed));
  let idListOfProcessed = rawDataOfProcessed.map(data => data.id_unique);

  // 取id的交集后排序 wzj
  const intersect = idListOfIndicator.filter(id => idListOfProcessed.includes(id));
  rawDataOfIndicator = rawDataOfIndicator.filter(data => intersect.includes(data.id_unique));
  rawDataOfProcessed = rawDataOfProcessed.filter(data => intersect.includes(data.id_unique));
  rawDataOfIndicator.sort(funcSortById);
  rawDataOfProcessed.sort(funcSortById);

  let rawData = rawDataOfProcessed.map((obj, index) => {
    let newObj = {};
    Object.assign(newObj, obj, rawDataOfIndicator[index]);
    return newObj;
  });

  console.log(rawData.length + " records of combination raw data");
  return rawData;
};


//
exports.getDataForAPI = (selectedDataList) => {
  let result = selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getHFIAS(selectedDataObj),
      getFoodShortage(selectedDataObj), getHDDS(selectedDataObj),
      getFoodConsumed(selectedDataObj) );
    return omitProperties(newObj, keysOfOmit);
  });

  // 不同时为null，则采用 wzj
  result.forEach(data => {
    if(isNaN(data.api_hdds_flush) && !isNaN(data.api_hdds_lean)) {
      data.api_hdds_flush = data.api_food_flush.length;
    }
    if(isNaN(data.api_hdds_lean) && !isNaN(data.api_hdds_flush)) {
      data.api_hdds_lean = data.api_food_lean.length;
    }
  });

  return result;
};


//
const getFoodConsumed = (dataObj) => {
  let goodSeason = findFoodGroup(foodConsumedGoodSeason, dataObj);
  let badSeason = findFoodGroup(foodConsumedBadSeason, dataObj);
  if(goodSeason.length === 0) {
    goodSeason = findFoodGroup(foodConsumedLastMonth, dataObj);
  }
  if(badSeason.length === 0) {
    badSeason = findFoodGroup(foodConsumedLastMonth, dataObj);
  }

  return {
    api_food_flush: transformFoodGroupType(goodSeason),
    api_food_lean: transformFoodGroupType(badSeason)
  };
};
exports.getFoodConsumed = getFoodConsumed; // export for test

const findFoodGroup = (foodList, dataObj) => {
  let result = [];
  foodList.forEach(food => {
    let frequency = dataObj[food] || "";
    frequency = frequency.toLowerCase();
    if(frequency === "daily" || frequency === "weekly") {
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


//
const getHDDS = (dataObj) => {
  let goodSeason = parseInt(dataObj.hdds_good_season) || parseInt(dataObj.hdds_last_month);
  let badSeason = parseInt(dataObj.hdds_bad_season) || parseInt(dataObj.hdds_last_month);
  return {
    api_hdds_flush: goodSeason,
    api_hdds_lean: badSeason
  };
};
exports.getHDDS = getHDDS;

//
const getFoodShortage = (dataObj) => {
  let monthsStr = dataObj.foodshortagetime_months_which;
  let monthList = [];
  if (typeof (monthsStr) === "string") {
    let tmpList = monthsStr.toLowerCase().split(/\s+/); // 正则匹配多个空格 wzj
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


//
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
  if (typeof(string) !== "string") {
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


//
const pickProperties = (data, selectKeys) => {
  let properties = selectKeys.map(key => {
    return (key in data ? {[key] : data[key]} : {})
  });

  return properties.reduce((preResult, prop) => Object.assign(preResult, prop), {})
}
exports.pickProperties = pickProperties; // export for test

//
const omitProperties = (data, selectKeys) => {
  let properties = Object.keys(data).map(key => {
    return (selectKeys.includes(key) ? {} : {[key] : data[key]})
  });

  return properties.reduce((preResult, prop) => Object.assign(preResult, prop), {})
}
exports.omitProperties = omitProperties; // export for test

//
const funcSortById = (a,b) => {
  const idA = a["id_unique"];
  const idB = b["id_unique"];
  if (idA > idB) {
    return 1;
  } else if (idA < idB) {
    return -1;
  } else {
    return 0;
  }
};

//
const funcGetFoodName = (foodStr) => {
  let tmpList = foodStr.split("_");
  tmpList.pop();
  tmpList.pop();
  return tmpList.join("_");
};
exports.funcGetFoodName = funcGetFoodName; // export for test
