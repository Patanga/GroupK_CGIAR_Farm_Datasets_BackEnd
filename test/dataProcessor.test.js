const assert = require("assert");
const dt = require("../data_test/data_test.js");
const dataList = require("./foodSecurity.test.js").dataList;
const processor = require("../app/controllers/dataProcessor.js");

const selectKeys = [
  "id_hh",
  "id_form",

  "id_proj",
  "iso_country_code",
  "year",

  "hfias_status",
  "fies_score"
];
const goodSeason = processor.foodConsumedGoodSeason;
const badSeason = processor.foodConsumedBadSeason;
const lastMonth = processor.foodConsumedLastMonth;


const selectedDataList = processor.getSelectedRawData(dt.indicatorDataList, dt.processedDataList);

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
    let result = processor.getDataForAPI(selectedDataList);
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

});


describe("testFoodConsumed", () => {

  it("test_getFoodConsumed", () => {
    //console.log(selectedDataList[0]);
    let result0 = processor.getFoodConsumed(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_food_lean"].includes("vegetables"),
      true);
    assert.equal(result0["api_food_lean"].includes("fruits"),
      false);

    //console.log(selectedDataList[8]);
    let result8 = processor.getFoodConsumed(selectedDataList[8]);
    console.log(result8);
    assert.equal(result8["api_food_flush"].includes("grainsrootstubers"),
      true);
    assert.equal(result8["api_food_flush"].includes("vita_veg_fruit"),
      true);
    assert.equal(result8["api_food_flush"].includes("meat"),
      false);
  });

  it("test_transformFoodGroupType", () => {
    const foodList = ["pulses", "milk", "fish_seafood", "milk_dairy"];
    let result = processor.transformFoodGroupType(foodList);
    console.log(result);
    assert.equal(result.includes("meat"), true);
    assert.equal(result.includes("pulses"), false);
    assert.equal(result.includes("milk"), false);
    assert.equal(result.includes("fish_seafood"), false);
  });

  it("test_funcGetFoodName", () => {
    assert.equal(processor.funcGetFoodName("grainsrootstubers_good_season"),
      "grainsrootstubers");
    assert.equal(processor.funcGetFoodName("roots_tubers_bad_season"),
      "roots_tubers");
    assert.equal(processor.funcGetFoodName("organ_meat_bad_season"),
      "organ_meat");

    assert.equal(processor.funcGetFoodName("fish_seafood_last_month"),
      "fish_seafood");
    assert.equal(processor.funcGetFoodName("milk_dairy_last_month"),
      "milk_dairy");
  });

});


describe("testHDDS", () => {

  it("test_getHDDS", () => {
    //console.log(selectedDataList[0]);
    let result0 = processor.getHDDS(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_hdds_flush"], 7);
    assert.equal(result0["api_hdds_lean"], 2);

    //console.log(selectedDataList[8]);
    let result8 = processor.getHDDS(selectedDataList[8]);
    console.log(result8);
    assert.equal(result8["api_hdds_flush"], 7);
    assert.equal(result8["api_hdds_lean"], 1);
  });

  it("test_parseInt", () => {
    let a = null;
    let b = null;
    let result = parseInt(a) || parseInt(b);
    assert.equal(result, NaN);
    a = "2";
    b = null;
    result = parseInt(a) || parseInt(b);
    assert.equal(result, 2);
    a = null;
    b = "5";
    result = parseInt(a) || parseInt(b);
    assert.equal(result, 5);

    a = "2";
    b = "3";
    result = parseInt(a) || parseInt(b);
    assert.equal(result, 2);
  });

});


describe("testFoodShortage", () => {

  it("test_getFoodShortage", () => {
    let result0 = processor.getFoodShortage(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_food_shortage_months"].length, 2);
    assert.equal(result0["api_food_shortage_months"][0], "Aug");

    let result8 = processor.getFoodShortage(selectedDataList[8]);
    assert.equal(result8["api_food_shortage_months"].length, 3);
    assert.equal(result8["api_food_shortage_months"][1], "Jun");

    let resultTest = processor.getFoodShortage(
      {foodshortagetime_months_which : "ss"});
    //console.log(resultTest);
    assert.equal(resultTest["api_food_shortage_months"].length, 0);

    resultTest = processor.getFoodShortage(
      {foodshortagetime_months_which : "Aug   s"});
    //console.log(resultTest);
    assert.equal(resultTest["api_food_shortage_months"].length, 1);
  });

  it("test_funcTitleCase", () => {
    assert.equal(processor.funcTitleCase("abc"), "Abc");
  });

});


describe("testHFIAS", () => {

  it("test_getHFIAS", () => {
    //console.log(dataList);
    assert.equal(processor.getHFIAS(dataList[0]).api_hfias_status, "moderately_fi");
    assert.equal(processor.getHFIAS(dataList[1]).api_hfias_status, "severely_fi");
    assert.equal(processor.getHFIAS(dataList[2]).api_hfias_status, "moderately_fi");
    assert.equal(processor.getHFIAS(dataList[3]).api_hfias_status, "moderately_fi");
    assert.equal(processor.getHFIAS(dataList[4]).api_hfias_status, null);
    assert.equal(processor.getHFIAS(dataList[5]).api_hfias_status, null);
    assert.equal(processor.getHFIAS(dataList[6]).api_hfias_status, "food_secure");
    assert.equal(processor.getHFIAS(dataList[7]).api_hfias_status, "food_secure");
    assert.equal(processor.getHFIAS(dataList[8]).api_hfias_status, "mildly_fi");
    assert.equal(processor.getHFIAS(dataList[9]).api_hfias_status, "mildly_fi");
  });

  it("test_isStandardHFIAS", () => {
    assert.equal(processor.isStandardHFIAS("s"), false);
    assert.equal(processor.isStandardHFIAS(""), false);
    assert.equal(processor.isStandardHFIAS(null), false);
    assert.equal(processor.isStandardHFIAS("moderateLY_FI"), true);
  });

});


describe("testFilter", () => {

  it("test_getSelectedRawData", () => {
    //console.log(selectedDataList);
    assert.equal(selectedDataList.length, 65);
  });

  it("test_pick", () => {
    let dataI1 = dt.indicatorDataList[0].data;
    let dataP1 = dt.processedDataList[0].data;
    let dataP2 = dt.processedDataList[8].data;
    assert.equal(dataP2.id_hh, "44c111f2ac30052d0dadd7d19c55d43c");
    let newArray = goodSeason.concat(badSeason,lastMonth);
    let resultP1 = processor.pickProperties(dataP1, newArray);
    let resultP2 = processor.pickProperties(dataP2, newArray);

    let resultI1 = processor.pickProperties(dataI1, selectKeys);
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
    let resultI1 = processor.omitProperties(dataI1, selectKeys);
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
    let resultP2 = processor.omitProperties(dataP2, newArray);
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