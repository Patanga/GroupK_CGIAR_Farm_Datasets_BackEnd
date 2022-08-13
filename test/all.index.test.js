const assert = require("assert");
const dt = require("../test_data/test_data.js");
const index = require("../app/data_processors/all.index");
const foodSecProcessor = require("../app/data_processors/foodSecurity.processor");


describe("print", () => {

  it("test_all", () => {
    const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
      index.pageMap["allPages"].keysOfSelect);

    let idx = 0;
    console.log(selectedDataList[idx]);
    let result = index.combineAttributes(selectedDataList, "allPages");
    console.log(result[idx]);

    //console.log(index.pageMap["allPages"].getAPIKeys(selectedDataList[3]));
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
    ["api_hfias_status", "moderately_fi"],
    ["api_food_shortage_months", ["Jan", "Dec"]],
    ["api_hdds_flush", 8],
    ["api_hdds_lean", 3],
    ["api_food_flush",
      [ "grainsrootstubers", "legumes", "veg_leafy", "vita_veg_fruit",
        "vegetables", "meat", "milk_dairy", "eggs" ]],
    ["api_food_lean", [ "grainsrootstubers", "legumes", "eggs" ]]
  ];

  it("test_all", () => {
    const selectedDataList = index.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
      index.pageMap["allPages"].keysOfSelect);

    //console.log(selectedDataList[3]);
    let result = index.combineAttributes(selectedDataList, "allPages");
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
    console.log(index.pageMap["allPages"].keysOfSelect);
    console.log(index.pageMap["allPages"].keysOfOmit);

    //console.log(index.pageMap["group"].keysOfSelect);
    //console.log(index.pageMap["group"].keysOfOmit);
  });

});


describe("testBasicProcessor", () => {
  const goodSeason = foodSecProcessor.foodConsumedGoodSeason;
  const badSeason = foodSecProcessor.foodConsumedBadSeason;
  const lastMonth = foodSecProcessor.foodConsumedLastMonth;
  const selectKeys = [
    "id_hh",
    "id_form",

    "id_proj",
    "iso_country_code",
    "year",

    "hfias_status",
    "fies_score"
  ];

  it("test_getSelectedRawData", () => {
    const selectedDataList = index.getSelectedRawData(dt.indicatorDataList,
      dt.processedDataList, foodSecProcessor.keysOfSelect);
    console.log(selectedDataList);
    assert.equal(selectedDataList.length, 65);
  });

  it("test_pick", () => {
    let dataI1 = dt.indicatorDataList[0].data;
    let dataP1 = dt.processedDataList[0].data;
    let dataP2 = dt.processedDataList[8].data;
    assert.equal(dataP2.id_hh, "44c111f2ac30052d0dadd7d19c55d43c");
    let newArray = goodSeason.concat(badSeason,lastMonth);
    let resultP1 = index.pickProperties(dataP1, newArray);
    let resultP2 = index.pickProperties(dataP2, newArray);

    let resultI1 = index.pickProperties(dataI1, selectKeys);
    //console.log(resultI1);
    assert.equal(resultI1.id_hh, "5ea973bf28337c32b420e44da1bad84c");

    assert.equal(resultP1.veg_leafy_good_season, "daily");
    assert.equal(resultP1.meat_good_season, "monthly");
    assert.equal(resultP1.eggs_bad_season, "monthly");
    assert.equal(resultP1.nuts_seeds_bad_season, "monthly");
    assert.equal(resultP2.fruits_last_month, "weekly");
    assert.equal(resultP2.vegetables_last_month, "daily");
  });

  it("test_omit", () => {
    let dataI1 = dt.indicatorDataList[0].data;
    assert.equal(dataI1.id_hh, "5ea973bf28337c32b420e44da1bad84c");
    assert.equal("id_hh" in dataI1, true);
    assert.equal("hfias_status" in dataI1, true);
    let resultI1 = index.omitProperties(dataI1, selectKeys);
    //console.log(dataI1);
    //console.log(resultI1);
    assert.equal("id_hh" in resultI1, false);
    assert.equal("hfias_status" in resultI1, false);
    assert.equal("hh_size_mae" in resultI1, true);
    assert.equal("hdds_good_season" in resultI1, true);

    let dataP2 = dt.processedDataList[8].data;
    assert.equal(dataP2.id_hh, "44c111f2ac30052d0dadd7d19c55d43c");
    assert.equal("meat_good_season" in dataP2, true);
    assert.equal("roots_tubers_last_month" in dataP2, true);
    let newArray = goodSeason.concat(badSeason,lastMonth);
    let resultP2 = index.omitProperties(dataP2, newArray);
    //console.log(resultP2);
    assert.equal("meat_good_season" in resultP2, false);
    assert.equal("roots_tubers_last_month" in resultP2, false);
  });

  it("combine array", () => {
    assert.equal(goodSeason.length, 22);
    assert.equal(badSeason.length, 22);
    assert.equal(lastMonth.length, 22);

    let newArray = goodSeason.concat(badSeason,lastMonth);
    assert.equal(newArray.length, 66);
    //console.log(newArray);
  });

});

