const assert = require("assert");
const dt = require("../../test_data/test_data.js");
const index = require("../../app/data_processors/all.index");
const offFarmProcessor = require("../../app/data_processors/offFarm.processor");

const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  index.pageMap["offFarm"].keysOfSelect);


{/*
describe("print", () => {
  it("test_getDataForAPI", () => {
    let idx = 6;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "offFarm");
    //console.log(result);
    console.log(result[idx]);
  })
});
//*/}


describe("Test OffFarm Processor", () => {

  it("test_getDataForAPI", () => {
    const propFixed1 = [
      ["id_unique", "022cc1e76da47b71fe9c8074016781dc"],
      ["id_country", "Burkina Faso"],
      ["region", "hauts bassins"],
      ["id_proj", "cir"],
      ["id_form", "bf_cir_2018"],
    ];
    const propAPI1 = [
      ["api_off_farm_months", ['jan', 'feb']],
      ["api_off_farm_activities", ['otherfarms']],
      ["api_off_farm_spending", ['possessions', 'invest_farm', 'invest_people']],
      ["api_off_farm_propotion", 'underhalf']
    ];


    let idx = 1;
    //console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "offFarm");
    //console.log(result);
    //console.log(result[idx]);

    const testPropAPI = (obj, props) => {
      assert.equal(obj[props[3][0]], props[3][1]);

      assert.equal(obj[props[0][0]].length, props[0][1].length);
      obj[props[0][0]].forEach(month => {
        assert.equal(props[0][1].includes(month), true);
      });

      assert.equal(obj[props[1][0]].length, props[1][1].length);
      obj[props[1][0]].forEach(act => {
        assert.equal(props[1][1].includes(act), true);
      });

      assert.equal(obj[props[2][0]].length, props[2][1].length);
      obj[props[2][0]].forEach(spend => {
        assert.equal(props[2][1].includes(spend), true);
      });
    };

    const testPropFixed = (obj, props) => {
      props.forEach(prop => {
        assert.equal(obj[prop[0]], prop[1]);
      });
    };

    testPropAPI(result[idx], propAPI1);
    testPropFixed(result[idx], propFixed1);
  });

});