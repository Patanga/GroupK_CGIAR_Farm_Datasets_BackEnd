const assert = require("assert");
const dt = require("../test_data/test_data.js");
const index = require("../app/data_processors/all.index");
const livestockProcessor = require("../app/data_processors/livestock.processor");


const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["livestock"].keysOfSelect);


describe("print", () => {

  it("test_getDataForAPI", () => {
    let idx = 0;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "livestock");
    //console.log(result);
    console.log(result[idx]);
  });

});


describe("testProcessor", () => {
  const propFixed3 = [
    ["id_unique", "0ccb14dd3c0262f22a30120f5e65b721"],
    ["id_country", "Burkina Faso"],
    ["region", "hauts bassins"],
    ["id_proj", "cir"],
    ["id_form", "bf_cir_2018"],
  ];
  const propAPI3 = [
  ];

  it("test_getDataForAPI", () => {
    console.log(selectedDataList[3]);
    let result = index.combineAttributes(selectedDataList, "livestock");
    //console.log(result);
    //console.log(result[3]);
    console.log(result[0]);

    const testPropAPI = (obj, props) => {
      assert.equal(obj[props[0][0]], props[0][1]);
      assert.equal(obj[props[2][0]], props[2][1]);
      assert.equal(obj[props[3][0]], props[3][1]);
      obj[props[1][0]].forEach(month => {
        assert.equal(props[1][1].includes(month), true);
      });
      props[1][1].forEach(month => {
        assert.equal(obj[props[1][0]].includes(month), true);
      });
      obj[props[4][0]].forEach(month => {
        assert.equal(props[4][1].includes(month), true);
      });
      props[4][1].forEach(month => {
        assert.equal(obj[props[4][0]].includes(month), true);
      });
      obj[props[5][0]].forEach(month => {
        assert.equal(props[5][1].includes(month), true);
      });
      props[5][1].forEach(month => {
        assert.equal(obj[props[5][0]].includes(month), true);
      });
    };
    const testPropFixed = (obj, props) => {
      props.forEach(prop => {
        assert.equal(obj[prop[0]], prop[1]);
      });
    };

    testPropAPI(result[3], propAPI3);
    testPropFixed(result[3], propFixed3);
  });

});


describe("testLivestockBreeds", () => {

  it("test_getLivestockBreeds", () => {
    const test1 = {
      livestock_name_1: "chicken",
      livestock_breeds_1: "local improved",
      livestock_name_2: "cattle",
      livestock_breeds_2: "improved_pure",
      livestock_name_3: "sheep",
      livestock_breeds_3: null,
    };
    let testResult1 = livestockProcessor.getLivestockBreeds(test1);
    console.log(testResult1);
    assert.equal(testResult1["api_breed_improved"].includes("chicken"), true);
    assert.equal(testResult1["api_breed_improved"].includes("cattle"), true);
    assert.equal(testResult1["api_breed_improved"].includes("sheep"), false);


    //console.log(selectedDataList[0]);
    let result0 = livestockProcessor.getLivestockBreeds(selectedDataList[0]);
    console.log(result0);
    //assert.equal(result0["api_livestocks_kept"][0][0], "cattle");
    //assert.equal(result0["api_livestocks_kept"][0][1], 3);


    //console.log(selectedDataList[8]);
    let result8 = livestockProcessor.getLivestockBreeds(selectedDataList[8]);
    console.log(result8);
  });

});


describe("testLivestockUse", () => {

  it("test_getLivestockUse", () => {
    //console.log(selectedDataList[0]);
    let result0 = livestockProcessor.getLivestockUse(selectedDataList[0]);
    console.log(result0);
    //assert.equal(result0["api_livestocks_kept"][0][0], "cattle");
    //assert.equal(result0["api_livestocks_kept"][0][1], 3);


    //console.log(selectedDataList[8]);
    let result8 = livestockProcessor.getLivestockUse(selectedDataList[8]);
    console.log(result8);
  });

});


describe("testLivestockFrequency", () => {

  it("test_getLivestockFrequency", () => {
    const test1 = {
      livestock_heads_cattle: ' 3',
      livestock_heads_sheep: '  5s',
      livestock_heads_goats: '  f'
    };
    let testResult1 = livestockProcessor.getLivestockFrequency(test1);
    //console.log(testResult1);

    //console.log(selectedDataList[0]);
    let result0 = livestockProcessor.getLivestockFrequency(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_livestocks_kept"][0][0], "cattle");
    assert.equal(result0["api_livestocks_kept"][0][1], 3);
    assert.equal(result0["api_livestocks_kept"][2][0], "goats");
    assert.equal(result0["api_livestocks_kept"][2][1], 5);
    assert.equal(result0["api_livestocks_kept"][12][0], "bees");
    assert.equal(result0["api_livestocks_kept"][12][1], 0);

    console.log(selectedDataList[8]);
    let result8 = livestockProcessor.getLivestockFrequency(selectedDataList[8]);
    console.log(result8);
    assert.equal(result8["api_livestocks_kept"][5][0], "otherpoultry");
    assert.equal(result8["api_livestocks_kept"][5][1], 0);
  });

});


