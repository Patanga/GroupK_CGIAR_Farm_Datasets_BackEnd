const assert = require("assert");
const dt = require("../test_data/test_data.js");
const index = require("../app/data_processors/all.index");
const cropsProcessor = require("../app/data_processors/crops.processor");

const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["crops"].keysOfSelect);


describe("print", () => {

  it("test_getDataForAPI", () => {
    let idx = 0;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "crops");
    //console.log(result);
    console.log(result[idx]);
  });

});


describe("testProcessor", () => {

  it("test_getDataForAPI", () => {
    //console.log(selectedDataList[0]);
    let result = index.combineAttributes(selectedDataList, "crops");
    console.log(result);

  });


});

describe("testAllCrops", () => {

  it("test_getAllCrops", () => {
    //console.log(selectedDataList[0]);
    let result0 = cropsProcessor.getAllCrops(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_crops_all"][0], "maize");
    assert.equal(result0["api_crops_all"][1], "sorghum");

    //console.log(selectedDataList[8]);
    let result8 = cropsProcessor.getAllCrops(selectedDataList[8]);
    console.log(result8);
    assert.equal(result8["api_crops_all"][2], "cowpea");
  });



});