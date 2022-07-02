const assert = require("assert");
const dt = require("../data_test/data_test.js");
const basic = require("../app/data_processors/basic.processor");
const cropsProcessor = require("../app/data_processors/crops.processor");

const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  cropsProcessor.keysOfSelect);


describe("testProcessor", () => {

  it("test_getDataForAPI", () => {
    console.log(selectedDataList[0]);
    let result = cropsProcessor.combineAttributes(selectedDataList);
    console.log(result);
    assert.equal(result0["api_food_lean"].includes("vegetables"),
      true);


    //console.log(selectedDataList[8]);
    let result8 = foodSecProcessor.getFoodConsumedAndHDDS(selectedDataList[8]);
    //console.log(result8);
    assert.equal(result8["api_food_flush"].includes("grainsrootstubers"),
      true);
    assert.equal(result8["api_food_flush"].includes("vita_veg_fruit"),
      true);
    assert.equal(result8["api_food_flush"].includes("meat"),
      false);
  });


});

describe("testAllCrops", () => {

  it("test_getAllCrops", () => {
    //console.log(selectedDataList[0]);
    let result0 = cropsProcessor.getAllCrops(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_crops_all"][0], "maize");
    assert.equal(result0["api_crops_all"][1], "sorghum");

    console.log(selectedDataList[8]);
    let result8 = cropsProcessor.getAllCrops(selectedDataList[8]);
    console.log(result8);
    assert.equal(result8["api_crops_all"][2], "cowpea");
  });



});