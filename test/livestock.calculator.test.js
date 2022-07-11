const assert = require("assert");
const dt = require("../data_test/data_test.js");
const dataList = dt.dataList;
const index = require("../app/data_processors/all.index");
const livestockCalculator = require("../app/data_calculators/livestock.calculator");

const basic = require("../app/data_processors/grouping.processor");
const livestockProcessor = require("../app/data_processors/livestock.processor");



const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["livestock"].keysOfSelect);


describe("testFoodSecurity", () => {

  it("test_Use", () => {
    let tmpResult = index.combineAttributes(dataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.buildUseData(tmpResult);
    //console.log(result);


    tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    result = livestockCalculator.buildUseData(tmpResult);
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
    let tmpResult = index.combineAttributes(dataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.buildHeadsData(tmpResult);
    //console.log(result);


    tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    //console.log(tmpResult[3]);
    result = livestockCalculator.buildHeadsData(tmpResult);
    console.log(result);

    assert.equal(result[0][3], 3);
    assert.equal(result[1][5], 7);
    assert.equal(result[0].includes(-1), false);
    assert.equal(result[1].includes(-1), false);
  });

  it("test_Use", () => {
    let tmpResult = index.combineAttributes(dataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.buildBreedsData(tmpResult);
    //console.log(result);


    tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    result = livestockCalculator.buildUseData(tmpResult);
    console.log(result);

  });

  it("test_count_Frequency", () => {
    let tmpResult = index.combineAttributes(dataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.count(tmpResult, "Frequency");
    //console.log(result);
    //assert.equal(result[0].name, "food_secure");
    //assert.equal(result[0].value, 2);


    tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    result = livestockCalculator.count(tmpResult, "Frequency");
    console.log(result);
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
  });

  it("test_count_Breeds", () => {
    let tmpResult = index.combineAttributes(dataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.buildBreedsData(tmpResult);
    //console.log(result);


    tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    result = livestockCalculator.buildBreedsData(tmpResult);
    console.log(result);

  });

});