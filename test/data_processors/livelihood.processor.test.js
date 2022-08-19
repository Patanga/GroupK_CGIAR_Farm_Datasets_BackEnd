const assert = require("assert");
const dt = require("../../test_data/test_data.js");
const index = require("../../app/data_processors/all.index");
const liveProcessor = require("../../app/data_processors/livelihoods.processor");

const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["livelihoods"].keysOfSelect);


{/*
describe("print", () => {
  it("test_getDataForAPI", () => {
    let idx = 6;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "livelihoods");
    //console.log(result);
    console.log(result[idx]);
  });
});
//*/}


describe("Test Livelihood Processor", () => {

  it("test_getDataForAPI", () => {
    const propFixed3 = [
      ["id_unique", "0ccb14dd3c0262f22a30120f5e65b721"],
      ["id_country", "Burkina Faso"],
      ["region", "hauts bassins"],
      ["id_proj", "cir"],
      ["id_form", "bf_cir_2018"],
    ];
    const propAPI3 = [
      ["api_tot_ppp_income_pd_pmae", 0],
      ["api_mae", 0],
      ["api_currency_conversion", 198.7925],
      ["api_income_lstk_ppp_pd_pmae", 0],
      ["api_income_crop_ppp_pd_pmae", 0],
      ["api_income_offfarm_ppp_pd_pmae", 0],
      ["api_cons_lstk_ppp_pd_pmae", 0],
      ["api_cons_crop_ppp_pd_pmae", 0]
    ];

    let idx = 3;
    //console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "livelihoods");
    //console.log(result);
    //console.log(result[idx]);

    const testPropAPI = (obj, props) => {
      for (let i = 0; i < props.length; i++) {
        assert.equal(obj[props[i][0]], props[i][1]);
      }
    };

    const testPropFixed = (obj, props) => {
      props.forEach(prop => {
        assert.equal(obj[prop[0]], prop[1]);
      });
    };

    testPropAPI(result[idx], propAPI3);
    testPropFixed(result[idx], propFixed3);
  });


  describe("Test Average Income", () => {

    it("test_getIncome", () => {
      //console.log(selectedDataList[0]);
      let result0 = liveProcessor.getIncome(selectedDataList[0]);
      //console.log(result0);
      assert.equal(result0["api_tot_ppp_income_pd_pmae"], 0);
    });

  });

});
