const assert = require("assert");
const dt = require("../data_test/data_test.js");
const dataList = dt.dataList;
const basic = require("../app/data_processors/grouping.processor");
const foodSecProcessor = require("../app/data_processors/foodSecurity.processor.js");
const foodSecCalculator = require("../app/data_calculators/foodSecurity.calculator.js");


const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  foodSecProcessor.keysOfSelect);


describe("testFoodSecurity", () => {

  it("test_count_FoodConsumed", () => {
    let tmpResult = foodSecProcessor.combineAttributes(dataList);
    //console.log(tmpResult);
    let resultOfCount = foodSecCalculator.count(tmpResult, "FoodConsumed");
    //console.log(resultOfCount);
    let result = foodSecCalculator.buildFoodConsumedData(tmpResult);
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


    tmpResult = foodSecProcessor.combineAttributes(selectedDataList);
    //console.log(tmpResult);
    //resultOfCount = fs.count(tmpResult, "FoodConsumed");
    //console.log(resultOfCount);
    result = foodSecCalculator.buildFoodConsumedData(tmpResult);
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
    let tmpResult = foodSecProcessor.combineAttributes(dataList);
    //console.log(tmpResult);
    let result = foodSecCalculator.buildHDDSData(tmpResult);
    //console.log(result);

    assert.equal(result[0][1], 4);
    assert.equal(result[1][0], 5);
    assert.equal(result[0].includes(-1), false);
    assert.equal(result[1].includes(-1), false);


    tmpResult = foodSecProcessor.combineAttributes(selectedDataList);
    //console.log(tmpResult);
    result = foodSecCalculator.buildHDDSData(tmpResult);
    //console.log(result);

    assert.equal(result[0][3], 3);
    assert.equal(result[1][5], 7);
    assert.equal(result[0].includes(-1), false);
    assert.equal(result[1].includes(-1), false);
  });

  it("test_count_FoodShortage", () => {
    let tmpResult = foodSecProcessor.combineAttributes(dataList);
    //console.log(tmpResult);
    let result = foodSecCalculator.buildFoodShortageData(tmpResult);
    console.log(result);
    let dataset = result.dataset;
    assert.equal(dataset[5][0], "Jun");
    assert.equal(dataset[5][1], 3);
    assert.equal(dataset[7][0], "Aug");
    assert.equal(dataset[7][1], 4);
    assert.equal(dataset[9][0], "Oct");
    assert.equal(dataset[9][1], 3);

    assert.equal(result.average, 2);

    tmpResult = foodSecProcessor.combineAttributes(selectedDataList);
    //console.log(tmpResult);
    result = foodSecCalculator.buildFoodShortageData(tmpResult);
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
    let tmpResult = foodSecProcessor.combineAttributes(dataList);
    console.log(tmpResult);
    let result = foodSecCalculator.count(tmpResult, "HFIAS");
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
    assert.equal(result[1].name, "mildly_fi");
    assert.equal(result[1].value, 2);
    assert.equal(result[2].name, "moderately_fi");
    assert.equal(result[2].value, 3);
    assert.equal(result[3].name, "severely_fi");
    assert.equal(result[3].value, 1);

    tmpResult = foodSecProcessor.combineAttributes(selectedDataList);
    //console.log(tmpResult);
    result = foodSecCalculator.count(tmpResult, "HFIAS");
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