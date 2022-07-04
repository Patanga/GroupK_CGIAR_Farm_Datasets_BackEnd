const assert = require("assert");
const dt = require("../data_test/data_test.js");
const index = require("../app/data_processors/all.index");
const liveProcessor = require("../app/data_processors/livelihoods.processor");


const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["livelihoods"].keysOfSelect);


describe("print", () => {

  it("test_getDataForAPI", () => {
    let idx = 6;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "livelihoods");
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
    let result = index.combineAttributes(selectedDataList, "ll");
    console.log(result);
    //console.log(result[3]);

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

    //testPropAPI(result[3], propAPI3);
    testPropFixed(result[3], propFixed3);
  });

});


describe("testAverageIncome", () => {

  it("test_calAppendIncome", () => {
    //console.log(selectedDataList[0]);
    let result0 = liveProcessor.calAppendIncome(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_tot_ppp_income_pd_pmae"], null);


    //console.log(selectedDataList[8]);
    let result8 = liveProcessor.calAppendIncome(selectedDataList[8]);
    console.log(result8);
  });

});