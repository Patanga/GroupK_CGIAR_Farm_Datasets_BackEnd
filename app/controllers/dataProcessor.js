const foodConsumedGoodSeason = [
  "grainsrootstubers_good_season",
  "legumes_good_season",
  "veg_leafy_good_season",
  "vita_veg_fruit_good_season",
  "vegetables_good_season",
  "fruits_good_season",
  "meat_good_season",
  "milk_dairy_good_season",
  "grains_good_season",
  "roots_tubers_good_season",
  "pulses_good_season",
  "nuts_seeds_good_season",
  "milk_good_season",
  "organ_meat_good_season",
  "meat_poultry_good_season",
  "fish_seafood_good_season",
  "eggs_good_season",
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
  "hdds_last_month",
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

  // Huiying's
    // Dashboard 1 & 2
  "livestock_heads_cattle",
  "livestock_heads_sheep",
  "livestock_heads_goats",
  "livestock_heads_pigs",
  "livestock_heads_chicken",
  "livestock_heads_otherpoultry",
  "livestock_heads_rabbits",
  "livestock_heads_fish",
  "livestock_heads_other_lstk",
  "livestock_heads_other2_lstk",
  "livestock_heads_other3_lstk",
  "livestock_heads_donkeys_horses",
  "livestock_heads_bees",

    // Dashboard 3
  "meat_sold_props_numeric_1",
  "meat_consumed_props_numeric_1",
  "meat_sold_props_numeric_2",
  "meat_consumed_props_numeric_2",
  "meat_sold_props_numeric_3",
  "meat_consumed_props_numeric_3",
  "meat_sold_props_numeric_4",
  "meat_consumed_props_numeric_4",
  "meat_sold_props_numeric_5",
  "meat_consumed_props_numeric_5",

  "eggs_sold_prop_numeric_1",
  "eggs_consumed_prop_numeric_1",
  "eggs_sold_prop_numeric_2",
  "eggs_consumed_prop_numeric_2",
  "eggs_sold_prop_numeric_3",
  "eggs_consumed_prop_numeric_3",
  "eggs_sold_prop_numeric_4",
  "eggs_consumed_prop_numeric_4",
  "eggs_sold_prop_numeric_5",
  "eggs_consumed_prop_numeric_5",

  "milk_sold_prop_numeric_1",
  "milk_consumed_prop_numeric_1",
  "milk_sold_prop_numeric_2",
  "milk_consumed_prop_numeric_2",
  "milk_sold_prop_numeric_3",
  "milk_consumed_prop_numeric_3",
  "milk_sold_prop_numeric_4",
  "milk_consumed_prop_numeric_4",
  "milk_sold_prop_numeric_5",
  "milk_consumed_prop_numeric_5",

    // Dashboard 4
  "livestock_name_1",
  "livestock_breeds_1",
  "livestock_name_2",
  "livestock_breeds_2",
  "livestock_name_3",
  "livestock_breeds_3",
  "livestock_name_4",
  "livestock_breeds_4",
  "livestock_name_5",
  "livestock_breeds_5",
];

const months = ["jan","feb","mar","apr",
  "may","jun","jul","aug",
  "sep","oct","nov","dec"
];


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
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getFoodShortage(selectedDataObj),
      getHFIAS(selectedDataObj) );
    return omitProperties(newObj, keysOfOmit);
  });
};


// getLivestockFrequency's Reference
const getFoodShortage = (dataObj) => {
  let monthsStr = dataObj.foodshortagetime_months_which;
  let monthList = [];
  if (typeof (monthsStr) === "string") {
    let tmpList = monthsStr.toLowerCase().split(/\s+/); // 正则匹配多个空格 wzj
    monthList = tmpList.filter(month => months.includes(month));
    monthList = monthList.map(month => funcTitleCase(month));
  }

  return { api_food_shortage_months: monthList,
    api_food_shortage_months_num: monthList.length };
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

// Huiying's
const LivestockKeys = [
  //keysForGeneral
  "id_unique",
  "id_country",
  "region",
  "id_proj",
  "id_form",

  //keys For Chart1 & Chart2
  /* For each household, sum up their value of key in keysForChart1_Chart2
   */
  "livestock_heads_cattle",
  "livestock_heads_sheep",
  "livestock_heads_goats",
  "livestock_heads_pigs",
  "livestock_heads_chicken",
  "livestock_heads_otherpoultry",
  "livestock_heads_rabbits",
  "livestock_heads_fish",
  "livestock_heads_other_lstk",
  "livestock_heads_other2_lstk",
  "livestock_heads_other3_lstk",
  "livestock_heads_donkeys_horses",
  "livestock_heads_bees",

  //keys For Chart3
  /* There are three type of conducts - meat, eggs, milk
     Every conduct have 5 data
     For each household and each conduct, merge their value
   */
  "meat_sold_props_numeric_1",
  "meat_consumed_props_numeric_1",
  "meat_sold_props_numeric_2",
  "meat_consumed_props_numeric_2",
  "meat_sold_props_numeric_3",
  "meat_consumed_props_numeric_3",
  "meat_sold_props_numeric_4",
  "meat_consumed_props_numeric_4",
  "meat_sold_props_numeric_5",
  "meat_consumed_props_numeric_5",

  "eggs_sold_prop_numeric_1",
  "eggs_consumed_prop_numeric_1",
  "eggs_sold_prop_numeric_2",
  "eggs_consumed_prop_numeric_2",
  "eggs_sold_prop_numeric_3",
  "eggs_consumed_prop_numeric_3",
  "eggs_sold_prop_numeric_4",
  "eggs_consumed_prop_numeric_4",
  "eggs_sold_prop_numeric_5",
  "eggs_consumed_prop_numeric_5",

  "milk_sold_prop_numeric_1",
  "milk_consumed_prop_numeric_1",
  "milk_sold_prop_numeric_2",
  "milk_consumed_prop_numeric_2",
  "milk_sold_prop_numeric_3",
  "milk_consumed_prop_numeric_3",
  "milk_sold_prop_numeric_4",
  "milk_consumed_prop_numeric_4",
  "milk_sold_prop_numeric_5",
  "milk_consumed_prop_numeric_5",

  //keys For Chart4
  /* To calculate the portion of "improved"
     For each household, if there is "improved"(string) in the value of keys, this household has improved breeds
     The result should be (household which has improved breeds/household number)
   */
  "livestock_name_1",
  "livestock_breeds_1",
  "livestock_name_2",
  "livestock_breeds_2",
  "livestock_name_3",
  "livestock_breeds_3",
  "livestock_name_4",
  "livestock_breeds_4",
  "livestock_name_5",
  "livestock_breeds_5",
]

// indicatorData× processedData√
const getRawData = (processedDataList) => {
  let dataList = processedDataList.map(processedData => processedData.data);
  let rawData = dataList.map(data => pickProperties(data, LivestockKeys));
  console.log(rawData.length);
  return rawData;
};
exports.getRawData = getRawData;

// Huiying's
const getLivestockData = (livestockDataList) => {
  let LivestockDataList = livestockDataList.map(livestockData => livestockData.data);
  let rawData = LivestockDataList.map(data => pickProperties(data, LivestockKeys));
  console.log(rawData.length);
  return rawData;
}
exports.getLivestockData = getLivestockData;

// Huiying's
const getLivestockFrequency = (dataObj) => {
  // value -> int
  // How to make these a list?
  let cattle = dataObj.livestock_heads_cattle;
  let sheep = dataObj.livestock_heads_sheep;
  let goats = dataObj.livestock_heads_goats;
  let pigs = dataObj.livestock_heads_pigs;
  let chicken = dataObj.livestock_heads_chicken;
  let otherPoultry = dataObj.livestock_heads_otherpoultry;
  let rabbits = dataObj.livestock_heads_rabbits;
  let fish = dataObj.livestock_heads_fish;
  let other_lstk = dataObj.livestock_heads_other_lstk;
  let other2_lstk = dataObj.livestock_heads_other2_lstk;
  let other3_lstk = dataObj.livestock_heads_other3_lstk;
  let donkeys_horses = dataObj.livestock_heads_donkeys_horses;
  let bees = dataObj.livestock_heads_bees;

  //
  let cattle_amount = parseFloat(cattle);
  let sheep_amount = parseFloat(sheep);
  let goats_amount = parseFloat(goats);
  let pigs_amount = parseFloat(pigs);
  let chicken_amount = parseFloat(chicken);
  let otherPoultry_amount = parseFloat(otherPoultry);
  let rabbits_amount = parseFloat(rabbits);
  let fish_amount = parseFloat(fish);
  let other_lstk_amount = parseFloat(other_lstk);
  let other2_lstk_amount = parseFloat(other2_lstk);
  let other3_lstk_amount = parseFloat(other3_lstk);
  let donkeys_horses_amount = parseFloat(donkeys_horses);
  let bees_amount = parseFloat(bees);

  return {
    cattle: cattle_amount,
    sheep: sheep_amount,
    goats: goats_amount,
    pigs: pigs_amount,
    chicken: chicken_amount,
    otherPoultry: otherPoultry_amount,
    rabbits: rabbits_amount,
    fish: fish_amount,
    other_lstk: other_lstk_amount,
    other2_lstk: other2_lstk_amount,
    other3_lstk: other3_lstk_amount,
    donkeys_horses: donkeys_horses_amount,
    bees: bees_amount,
  }
};

function isNumber(val){
  let regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。
  if(regPos.test(val) ){
    return true;
  }else{
    return false;
  }
}

const getLivestockUse = (dataObj) => {
  //
  let meat_sold;
  let meat_sold_1 = parseFloat(dataObj.meat_sold_props_numeric_1);
  let meat_sold_2 = parseFloat(dataObj.meat_sold_props_numeric_2);
  let meat_sold_3 = parseFloat(dataObj.meat_sold_props_numeric_3);
  let meat_sold_4 = parseFloat(dataObj.meat_sold_props_numeric_4);
  let meat_sold_5 = parseFloat(dataObj.meat_sold_props_numeric_5);

  if (isNumber(meat_sold_1) && meat_sold_1 != 0 ||
      isNumber(meat_sold_2) && meat_sold_2 != 0 ||
      isNumber(meat_sold_3) && meat_sold_3 != 0 ||
      isNumber(meat_sold_4) && meat_sold_4 != 0 ||
      isNumber(meat_sold_5) && meat_sold_5 != 0){
    meat_sold = 1;
  } else {
    meat_sold = 0;
  }

  let meat_consumed;
  let meat_consumed_1 = parseFloat(dataObj.meat_consumed_props_numeric_1);
  let meat_consumed_2 = parseFloat(dataObj.meat_consumed_props_numeric_2);
  let meat_consumed_3 = parseFloat(dataObj.meat_consumed_props_numeric_3);
  let meat_consumed_4 = parseFloat(dataObj.meat_consumed_props_numeric_4);
  let meat_consumed_5 = parseFloat(dataObj.meat_consumed_props_numeric_5);

  if (isNumber(meat_consumed_1) && meat_consumed_1 != 0 ||
      isNumber(meat_consumed_2) && meat_consumed_2 != 0 ||
      isNumber(meat_consumed_3) && meat_consumed_3 != 0 ||
      isNumber(meat_consumed_4) && meat_consumed_4 != 0 ||
      isNumber(meat_consumed_5) && meat_consumed_5 != 0){
    meat_consumed = 1;
  } else {
    meat_consumed = 0;
  }

  //
  let eggs_sold;
  let eggs_sold_1 = parseFloat(dataObj.eggs_sold_prop_numeric_1);
  let eggs_sold_2 = parseFloat(dataObj.eggs_sold_prop_numeric_2);
  let eggs_sold_3 = parseFloat(dataObj.eggs_sold_prop_numeric_3);
  let eggs_sold_4 = parseFloat(dataObj.eggs_sold_prop_numeric_4);
  let eggs_sold_5 = parseFloat(dataObj.eggs_sold_prop_numeric_5);

  if (isNumber(eggs_sold_1) && eggs_sold_1 != 0 ||
      isNumber(eggs_sold_2) && eggs_sold_2 != 0 ||
      isNumber(eggs_sold_3) && eggs_sold_3 != 0 ||
      isNumber(eggs_sold_4) && eggs_sold_4 != 0 ||
      isNumber(eggs_sold_5) && eggs_sold_5 != 0){
    eggs_sold = 1;
  } else {
    eggs_sold = 0;
  }

  let eggs_consumed;
  let eggs_consumed_1 = parseFloat(dataObj.eggs_consumed_prop_numeric_1);
  let eggs_consumed_2 = parseFloat(dataObj.eggs_consumed_prop_numeric_2);
  let eggs_consumed_3 = parseFloat(dataObj.eggs_consumed_prop_numeric_3);
  let eggs_consumed_4 = parseFloat(dataObj.eggs_consumed_prop_numeric_4);
  let eggs_consumed_5 = parseFloat(dataObj.eggs_consumed_prop_numeric_5);

  if (isNumber(eggs_consumed_1) && eggs_consumed_1 != 0 ||
      isNumber(eggs_consumed_2) && eggs_consumed_2 != 0 ||
      isNumber(eggs_consumed_3) && eggs_consumed_3 != 0 ||
      isNumber(eggs_consumed_4) && eggs_consumed_4 != 0 ||
      isNumber(eggs_consumed_5) && eggs_consumed_5 != 0){
    eggs_consumed = 1;
  } else {
    eggs_consumed = 0;
  }

  //
  let milk_sold;
  let milk_sold_1 = parseFloat(dataObj.milk_sold_prop_numeric_1);
  let milk_sold_2 = parseFloat(dataObj.milk_sold_prop_numeric_2);
  let milk_sold_3 = parseFloat(dataObj.milk_sold_prop_numeric_3);
  let milk_sold_4 = parseFloat(dataObj.milk_sold_prop_numeric_4);
  let milk_sold_5 = parseFloat(dataObj.milk_sold_prop_numeric_5);

  if (isNumber(milk_sold_1) && milk_sold_1 != 0 ||
      isNumber(milk_sold_2) && milk_sold_2 != 0 ||
      isNumber(milk_sold_3) && milk_sold_3 != 0 ||
      isNumber(milk_sold_4) && milk_sold_4 != 0 ||
      isNumber(milk_sold_5) && milk_sold_5 != 0){
    milk_sold = 1;
  } else {
    milk_sold = 0;
  }

  let milk_consumed;
  let milk_consumed_1 = parseFloat(dataObj.milk_consumed_prop_numeric_1);
  let milk_consumed_2 = parseFloat(dataObj.milk_consumed_prop_numeric_2);
  let milk_consumed_3 = parseFloat(dataObj.milk_consumed_prop_numeric_3);
  let milk_consumed_4 = parseFloat(dataObj.milk_consumed_prop_numeric_4);
  let milk_consumed_5 = parseFloat(dataObj.milk_consumed_prop_numeric_5);

  if (isNumber(milk_consumed_1) && milk_consumed_1 != 0 ||
      isNumber(milk_consumed_2) && milk_consumed_2 != 0 ||
      isNumber(milk_consumed_3) && milk_consumed_3 != 0 ||
      isNumber(milk_consumed_4) && milk_consumed_4 != 0 ||
      isNumber(milk_consumed_5) && milk_consumed_5 != 0){
    milk_consumed = 1;
  } else {
    milk_consumed = 0;
  }

  return {
    meat_sold: meat_sold,
    meat_consumed: meat_consumed,
    eggs_sold: eggs_sold,
    eggs_consumed: eggs_consumed,
    milk_sold: milk_sold,
    milk_consumed: milk_consumed,
  }
};

const getLivestockBreeds = (dataObj) => {
  //
  let livestock_name_1 = dataObj.livestock_name_1;
  let livestock_name_2 = dataObj.livestock_name_2;
  let livestock_name_3 = dataObj.livestock_name_3;
  let livestock_name_4 = dataObj.livestock_name_4;
  let livestock_name_5 = dataObj.livestock_name_5;


  //
  let livestock_1_breeds = dataObj.livestock_breeds_1;
  let livestock_2_breeds = dataObj.livestock_breeds_2;
  let livestock_3_breeds = dataObj.livestock_breeds_3;
  let livestock_4_breeds = dataObj.livestock_breeds_4;
  let livestock_5_breeds = dataObj.livestock_breeds_5;


  return {
    livestock_1: [livestock_name_1, livestock_1_breeds],
    livestock_2: [livestock_name_2, livestock_2_breeds],
    livestock_3: [livestock_name_3, livestock_3_breeds],
    livestock_4: [livestock_name_4, livestock_4_breeds],
    livestock_5: [livestock_name_5, livestock_5_breeds],
  }
};

// 参考getDataForAPI
// selectedDataList should be "livestock_heads_cattle" etc
exports.getLivestockDataForAPI = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getLivestockFrequency(selectedDataObj), getLivestockUse(selectedDataObj), getLivestockBreeds(selectedDataObj) );
    return omitProperties(newObj, keysOfOmit);
  });
};