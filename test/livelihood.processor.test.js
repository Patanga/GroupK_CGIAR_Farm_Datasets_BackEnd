const assert = require("assert");
const dt = require("../data_test/data_test.js");
const basic = require("../app/data_processors/basic.processor");
const liveProcessor = require("../app/data_processors/livelihoods.processor");

const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  liveProcessor.keysOfSelect);


describe("testProcessor", () => {

  it("test_calAppendIncome", () => {
    console.log(selectedDataList[0]);
    let result0 = liveProcessor.calAppendIncome(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_food_lean"].includes("vegetables"),
      true);


    //console.log(selectedDataList[8]);
    let result8 = foodSecProcessor.getFoodConsumedAndHDDS(selectedDataList[8]);
    console.log(result8);
    assert.equal(result8["api_food_flush"].includes("grainsrootstubers"),
      true);
    assert.equal(result8["api_food_flush"].includes("vita_veg_fruit"),
      true);
    assert.equal(result8["api_food_flush"].includes("meat"),
      false);
  });


});