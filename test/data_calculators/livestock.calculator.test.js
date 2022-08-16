const assert = require("assert");
const dt = require("../../test_data/test_data.js");
const index = require("../../app/data_processors/all.index");
const livestockCalculator = require("../../app/data_calculators/livestock.calculator");

const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["livestock"].keysOfSelect);


describe("Test Livestock Calculator", () => {

  it("test_Use", () => {
    let tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.buildUseData(tmpResult);
    //console.log(result);

    assert.equal(result[0][0], 'meat');
    assert.equal(result[0][1], 2);
    assert.equal(result[0][2], 0);
    assert.equal(result[1][0], 'eggs');
    assert.equal(result[1][1], 0);
    assert.equal(result[1][2], 2);
    assert.equal(result[2][0], 'milk');
    assert.equal(result[2][1], 5);
    assert.equal(result[2][2], 11);
  });

  it("test_Heads", () => {
    let tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    //console.log(tmpResult[3]);
    let result = livestockCalculator.buildHeadsData(tmpResult);
    //console.log(result);

    assert.equal(Object.keys(result).length, 13);
    assert.equal(result["pigs"].length, 65);
    assert.equal(Object.keys(result).includes("chicken"), true);
  });

  it("test_count_Frequency", () => {
    let tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.count(tmpResult, "Frequency");
    //console.log(result);
    assert.equal(result.length, 8);
    assert.equal(result[4][0], "otherpoultry");
    assert.equal(result[4][1], 5);
    assert.equal(result[6][0], "rabbits");
    assert.equal(result[6][1], 1);
  });

  it("test_count_Breeds", () => {
    let tmpResult = index.combineAttributes(selectedDataList, "livestock");
    //console.log(tmpResult);
    let result = livestockCalculator.buildBreedsData(tmpResult);
    //console.log(result);

    assert.equal(result.length, 1);
    assert.equal(result[0][0], "No Breeds Count");
    assert.equal(result[0][1], 0);
  });

});