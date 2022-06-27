const assert = require("assert");
const dt = require("../data_test/data_test.js");
const fs = require("../app/controllers/foodSecurity.js");
const processor = require("../app/controllers/dataProcessor.js");

const makeDataList = () => {
  let indicatorData1 = {
    fies_score: "4", hfias_status: "food_secure",
    foodshortagetime_months_which: "jun jul sep aug",
    dataType: "indicator_data",
    formID: "bf_adn_2019",
    grainsrootstubers_good_season: 'daily',
    veg_leafy_good_season: null,
    grainsrootstubers_bad_season: null,
  }

  let indicatorData2 = {
    fies_score: "6", hfias_status: "food_secure",
    foodshortagetime_months_which: "jun jul aug",
    dataType: "indicator_data",
    formID: "bf_adn_2019",
    veg_leafy_good_season: 'weekly',
    fruits_good_season: 'monthly',
  }

  let indicatorData3 = {
    fies_score: null, hfias_status: "moderately_fi",
    foodshortagetime_months_which: "",
    dataType: "indicator_data",
    formID: "la_ham_2016",
    fruits_good_season: 'weekly',
  }

  let indicatorData4 = {
    fies_score: -1, hfias_status: "moderateLY_FI",
    foodshortagetime_months_which: "aug jul jun may sep",
    grainsrootstubers_bad_season: null,
  }

  let indicatorData5 = {
    fies_score: null, hfias_status: null,
    foodshortagetime_months_which: "sd",
    grainsrootstubers_bad_season: 'weekly',
  }

  let indicatorData6 = {
    fies_score: null, hfias_status: "ss",
    foodshortagetime_months_which: "jan oct jul",
    grainsrootstubers_last_month: 'daily',
    veg_leafy_last_month: 'weekly',
  }

  let list =  [indicatorData1, indicatorData2, indicatorData3, indicatorData4,
    indicatorData5, indicatorData6];

  list[6] = { fies_score: 0, hfias_status: "ss",
    foodshortagetime_months_which: "oct jul",
    grainsrootstubers_bad_season: 'weekly',
    veg_leafy_last_month: 'weekly',};
  list[7] = { fies_score: null, hfias_status: "food_secure",
    foodshortagetime_months_which: " oct aug sep",};
  list[8] = { fies_score: null, hfias_status: "MILDly_fi",
    foodshortagetime_months_which: "",};
  list[9] = { fies_score: 1, hfias_status: null,
    foodshortagetime_months_which: "",};

  return list;
}

let dataList = makeDataList();
exports.dataList = dataList; // export for test

const selectedDataList = processor.getSelectedRawData(dt.indicatorDataList, dt.processedDataList);


describe("testFoodSecurity", () => {

  it("test_count_FoodConsumed", () => {
    let tmpResult = processor.getDataForAPI(dataList);
    //console.log(tmpResult);
    let resultOfCount = fs.count(tmpResult, "FoodConsumed");
    //console.log(resultOfCount);
    let result = fs.buildFoodConsumedData(tmpResult);
    console.log(result);

    assert.equal(result[0][0], "grainsrootstubers");
    assert.equal(result[0][1], 3);
    assert.equal(result[0][2], 2);
    assert.equal(result[3][0], "veg_leafy");
    assert.equal(result[3][1], 1);
    assert.equal(result[3][2], 3);
    assert.equal(result[6][0], "fruits");
    assert.equal(result[6][1], 0);
    assert.equal(result[6][2], 1);


    tmpResult = processor.getDataForAPI(selectedDataList);
    //console.log(tmpResult);
    //resultOfCount = fs.count(tmpResult, "FoodConsumed");
    //console.log(resultOfCount);
    result = fs.buildFoodConsumedData(tmpResult);
    console.log(result);

    assert.equal(result[1][0], "legumes");
    assert.equal(result[1][1], 19);
    assert.equal(result[1][2], 50);
    assert.equal(result[5][0], "vegetables");
    assert.equal(result[5][1], 40);
    assert.equal(result[5][2], 65);
    assert.equal(result[9][0], "milk_dairy");
    assert.equal(result[9][1], 9);
    assert.equal(result[9][2], 39);
  });

  it("test_HDDS", () => {
    let tmpResult = processor.getDataForAPI(dataList);
    //console.log(tmpResult);
    let result = fs.buildHDDSData(tmpResult);
    //console.log(result);

    //assert.equal(result[0][0], "grainsrootstubers");



    tmpResult = processor.getDataForAPI(selectedDataList);
    console.log(tmpResult);
    result = fs.buildHDDSData(tmpResult);
    console.log(result);

    assert.equal(result[1][0], "legumes");
  });

  it("test_count_FoodShortage", () => {
    let tmpResult = processor.getDataForAPI(dataList);
    //console.log(tmpResult);
    let result = fs.buildFoodShortageData(tmpResult);
    console.log(result);
    let dataset = result.dataset;
    assert.equal(dataset[5][0], "Jun");
    assert.equal(dataset[5][1], 3);
    assert.equal(dataset[7][0], "Aug");
    assert.equal(dataset[7][1], 4);
    assert.equal(dataset[9][0], "Oct");
    assert.equal(dataset[9][1], 3);

    assert.equal(result.average, 2);

    tmpResult = processor.getDataForAPI(selectedDataList);
    //console.log(tmpResult);
    result = fs.buildFoodShortageData(tmpResult);
    console.log(result);
    dataset = result.dataset;
    assert.equal(dataset[5][0], "Jun");
    assert.equal(dataset[5][1], 33);
    assert.equal(dataset[7][0], "Aug");
    assert.equal(dataset[7][1], 35);
    assert.equal(dataset[9][0], "Oct");
    assert.equal(dataset[9][1], 2);

    assert.equal(result.average.toFixed(2), 2.52);
  });

  it("test_count_HFIAS", () => {
    let tmpResult = processor.getDataForAPI(dataList);
    //console.log(tmpResult);
    let result = fs.count(tmpResult, "HFIAS");
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
    assert.equal(result[1].name, "mildly_fi");
    assert.equal(result[1].value, 2);
    assert.equal(result[2].name, "moderately_fi");
    assert.equal(result[2].value, 3);
    assert.equal(result[3].name, "severely_fi");
    assert.equal(result[3].value, 1);

    tmpResult = processor.getDataForAPI(selectedDataList);
    console.log(tmpResult);
    result = fs.count(tmpResult, "HFIAS");
    //console.log(result);
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
    assert.equal(result[1].name, "mildly_fi");
    assert.equal(result[1].value, 4);
    assert.equal(result[2].name, "moderately_fi");
    assert.equal(result[2].value, 23);
    assert.equal(result[3].name, "severely_fi");
    assert.equal(result[3].value, 36);
  });

});