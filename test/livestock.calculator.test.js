const assert = require("assert");
const dt = require("../data_test/data_test.js");
const dataList = dt.dataList;
const basic = require("../app/data_processors/grouping.processor");
const livestockProcessor = require("../app/data_processors/livestock.processor");
const livestockCalculator = require("../app/data_calculators/livestock.calculator");


const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  livestockProcessor.keysOfSelect);


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

  it("test_Heads", () => {
    let tmpResult = livestockProcessor.combineAttributes(dataList);
    //console.log(tmpResult);
    let result = livestockCalculator.buildHeadsData(tmpResult);
    //console.log(result);


    tmpResult = livestockProcessor.combineAttributes(selectedDataList);
    //console.log(tmpResult);
    //console.log(tmpResult[3]);
    result = livestockCalculator.buildHeadsData(tmpResult);
    console.log(result);

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

  it("test_count_Frequency", () => {
    let tmpResult = livestockProcessor.combineAttributes(dataList);
    //console.log(tmpResult);
    let result = livestockCalculator.count(tmpResult, "Frequency");
    //console.log(result);
    //assert.equal(result[0].name, "food_secure");
    //assert.equal(result[0].value, 2);


    tmpResult = livestockProcessor.combineAttributes(selectedDataList);
    //console.log(tmpResult);
    result = livestockCalculator.count(tmpResult, "Frequency");
    console.log(result);
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
  });

});