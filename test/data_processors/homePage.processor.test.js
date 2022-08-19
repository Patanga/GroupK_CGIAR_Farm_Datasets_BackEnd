const assert = require("assert");
const dt = require("../../test_data/test_data.js");
const index = require("../../app/data_processors/all.index");
const homeProcessor = require("../../app/data_processors/homePage.processor");

const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["home"].keysOfSelect);


{/*
describe("print", () => {
  it("test_getDataForAPI", () => {
    let idx = 8;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "home");
    //console.log(result);
    console.log(result[idx]);
  });
});
//*/}


describe("Test HomePage Processor", () => {

  it("test_getDataForAPI", () => {
    const propFixed3 = [
      ["id_unique", "0ccb14dd3c0262f22a30120f5e65b721"],
      ["id_country", "Burkina Faso"],
      ["region", "hauts bassins"],
      ["id_proj", "cir"],
      ["id_form", "bf_cir_2018"],
    ];
    const propAPI3 = [
      ["api_gps", [11.57, -3.4]]
    ];

    //console.log(selectedDataList[3]);
    let result = index.combineAttributes(selectedDataList, "home");
    //console.log(result);
    //console.log(result[3]);

    const testPropAPI = (obj, props) => {
      assert.equal(obj[props[0][0]][0], props[0][1][0]);
      assert.equal(obj[props[0][0]][1], props[0][1][1]);
    };

    const testPropFixed = (obj, props) => {
      props.forEach(prop => {
        assert.equal(obj[prop[0]], prop[1]);
      });
    };

    testPropFixed(result[3], propFixed3);
    testPropAPI(result[3], propAPI3);
  });

});