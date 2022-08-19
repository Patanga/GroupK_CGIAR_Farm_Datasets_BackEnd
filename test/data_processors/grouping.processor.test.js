const assert = require("assert");
const dt = require("../../test_data/test_data.js");
const index = require("../../app/data_processors/all.index");
const groupProcessor = require("../../app/data_processors/grouping.processor.js");

const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["group"].keysOfSelect);


{/*
describe("print", () => {
  it("test_getDataForAPI", () => {
    let idx = 8;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "group");
    //console.log(result);
    console.log(result[idx]);
  });
});
//*/}


describe("Test Grouping Processor", () => {

  it("test_getDataForAPI", () => {
    const propFixed5 = [
      ["id_unique", "125dc07885257c33dd33cb9639352236"],
      ["id_country", "Burkina Faso"],
      ["region", "hauts bassins"],
      ["id_proj", "cir"],
      ["id_form", "bf_cir_2018"],
    ];

    //console.log(selectedDataList[5]);
    let result = index.combineAttributes(selectedDataList, "group");
    //console.log(result);
    //console.log(result[5]);

    const testPropFixed = (obj, props) => {
      props.forEach(prop => {
        assert.equal(obj[prop[0]], prop[1]);
      });
    };

    testPropFixed(result[5], propFixed5);
  });

  it("test_getCountry", () => {
    //console.log(selectedDataList[0]);
    let result0 = groupProcessor.getCountry(selectedDataList[0]);
    //console.log(result0);
    assert.equal(result0["id_country"], "Burkina Faso");
  });

  it("test_getRegion", () => {
    //console.log(selectedDataList[0]);
    let result0 = groupProcessor.getRegion(selectedDataList[0]);
    //console.log(result0);
    assert.equal(result0["region"], "hauts bassins");
  });

});