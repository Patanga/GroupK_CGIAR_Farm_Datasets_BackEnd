const assert = require("assert");
const dt = require("../../test_data/test_data.js");
const index = require("../../app/data_processors/all.index");
const cropsProcessor = require("../../app/data_processors/crops.processor");

const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["crops"].keysOfSelect);


{/*
describe("print", () => {
  it("test_getDataForAPI", () => {
    let idx = 0;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "crops");
    //console.log(result);
    console.log(result[idx]);
  });
});
//*/}


describe("Test Crops Processor", () => {

  it("test_getDataForAPI", () => {
    const propFixed3 = [
      ["id_unique", "0ccb14dd3c0262f22a30120f5e65b721"],
      ["id_country", "Burkina Faso"],
      ["region", "hauts bassins"],
      ["id_proj", "cir"],
      ["id_form", "bf_cir_2018"],
    ];
    const propAPI3 = [
      ["api_crops_all", ['cotton', 'maize', 'sorghum', 'groundnut', 'cowpea']],
      ["api_landArea", 3]
    ];

    let idx = 3;
    //console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "crops");
    //console.log(result);
    //console.log(result[idx]);

    const testPropAPI = (obj, props) => {
      assert.equal(obj[props[1][0]], props[1][1]);

      assert.equal(obj[props[0][0]].length, props[0][1].length);
      obj[props[0][0]].forEach(month => {
        assert.equal(props[0][1].includes(month), true);
      });
    };

    const testPropFixed = (obj, props) => {
      props.forEach(prop => {
        assert.equal(obj[prop[0]], prop[1]);
      });
    };

    testPropAPI(result[idx], propAPI3);
    testPropFixed(result[idx], propFixed3);
  });


  describe("Test All Crops", () => {

    it("test_getAllCrops", () => {
      //console.log(selectedDataList[0]);
      let result0 = cropsProcessor.getAllCrops(selectedDataList[0]);
      //console.log(result0);
      assert.equal(result0["api_crops_all"][0], "maize");
      assert.equal(result0["api_crops_all"][1], "sorghum");

      //console.log(selectedDataList[8]);
      let result8 = cropsProcessor.getAllCrops(selectedDataList[8]);
      //console.log(result8);
      assert.equal(result8["api_crops_all"][2], "cowpea");
    });

  });

});
