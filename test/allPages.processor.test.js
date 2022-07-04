const assert = require("assert");
const dt = require("../data_test/data_test.js");
const basic = require("../app/data_processors/grouping.processor");
const allPagesProcessor = require("../app/data_processors/allPages.processor");


const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  allPagesProcessor.keysOfSelect);


describe("testProcessor", () => {
  const propFixed3 = [
    ["id_unique", "0ccb14dd3c0262f22a30120f5e65b721"],
    ["id_country", "Burkina Faso"],
    ["region", "hauts bassins"],
    ["id_proj", "cir"],
    ["id_form", "bf_cir_2018"],
  ];
  const propAPI3 = [
    ["api_hfias_status", "moderately_fi"],
    ["api_food_shortage_months", ["Jan", "Dec"]],
    ["api_hdds_flush", 8],
    ["api_hdds_lean", 3],
    ["api_food_flush",
      [ "grainsrootstubers", "legumes", "veg_leafy", "vita_veg_fruit",
        "vegetables", "meat", "milk_dairy", "eggs" ]],
    ["api_food_lean", [ "grainsrootstubers", "legumes", "eggs" ]]
  ];

  it("test_getDataForAPI", () => {
    //console.log(selectedDataList[3]);
    let result = allPagesProcessor.combineAttributes(selectedDataList);
    //console.log(result);
    console.log(result[3]);

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

  it("test_keys", () => {
    console.log(allPagesProcessor.keysOfSelect);
    console.log(allPagesProcessor.keysOfOmit);
  });

});