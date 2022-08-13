const assert = require("assert");
const dt = require("../test_data/test_data.js");
const index = require("../app/data_processors/all.index");
const groupProcessor = require("../app/data_processors/grouping.processor.js");


const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["group"].keysOfSelect);


describe("print", () => {

  it("test_getDataForAPI", () => {
    let idx = 8;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "group");
    //console.log(result);
    console.log(result[idx]);
  });

});


describe("testProcessor", () => {

  it("test_getDataForAPI", () => {
  });

});