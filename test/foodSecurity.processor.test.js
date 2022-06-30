const assert = require("assert");
const dt = require("../data_test/data_test.js");
const dataList = dt.dataList;
const basic = require("../app/data_processors/basic.processor");
const foodSecProcessor = require("../app/data_processors/foodSecurity.processor.js");


const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList, dt.processedDataList,
  foodSecProcessor.keysOfSelect);

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
    let result = foodSecProcessor.combineAttributes(selectedDataList);
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
    let result0 = foodSecProcessor.getFoodConsumedAndHDDS(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_food_lean"].includes("vegetables"),
      true);
    assert.equal(result0["api_food_lean"].includes("fruits"),
      false);

    //console.log(selectedDataList[8]);
    let result8 = foodSecProcessor.getFoodConsumedAndHDDS(selectedDataList[8]);
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
    let result = foodSecProcessor.transformFoodGroupType(foodList);
    console.log(result);
    assert.equal(result.includes("meat"), true);
    assert.equal(result.includes("pulses"), false);
    assert.equal(result.includes("milk"), false);
    assert.equal(result.includes("fish_seafood"), false);
  });

  it("test_funcGetFoodName", () => {
    assert.equal(foodSecProcessor.funcGetFoodName("grainsrootstubers_good_season"),
      "grainsrootstubers");
    assert.equal(foodSecProcessor.funcGetFoodName("roots_tubers_bad_season"),
      "roots_tubers");
    assert.equal(foodSecProcessor.funcGetFoodName("organ_meat_bad_season"),
      "organ_meat");

    assert.equal(foodSecProcessor.funcGetFoodName("fish_seafood_last_month"),
      "fish_seafood");
    assert.equal(foodSecProcessor.funcGetFoodName("milk_dairy_last_month"),
      "milk_dairy");
  });

});


describe("testHDDS", () => {

  it("test_getHDDS", () => {
    //console.log(selectedDataList[0]);
    let result0 = foodSecProcessor.getFoodConsumedAndHDDS(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_hdds_flush"], 7);
    assert.equal(result0["api_hdds_lean"], 2);

    //console.log(selectedDataList[8]);
    let result8 = foodSecProcessor.getFoodConsumedAndHDDS(selectedDataList[8]);
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
    let result0 = foodSecProcessor.getFoodShortage(selectedDataList[0]);
    console.log(result0);
    assert.equal(result0["api_food_shortage_months"].length, 2);
    assert.equal(result0["api_food_shortage_months"][0], "Aug");

    let result8 = foodSecProcessor.getFoodShortage(selectedDataList[8]);
    assert.equal(result8["api_food_shortage_months"].length, 3);
    assert.equal(result8["api_food_shortage_months"][1], "Jun");

    let resultTest = foodSecProcessor.getFoodShortage(
      {foodshortagetime_months_which : "ss"});
    //console.log(resultTest);
    assert.equal(resultTest["api_food_shortage_months"].length, 0);

    resultTest = foodSecProcessor.getFoodShortage(
      {foodshortagetime_months_which : "Aug   s"});
    //console.log(resultTest);
    assert.equal(resultTest["api_food_shortage_months"].length, 1);
  });

  it("test_funcTitleCase", () => {
    assert.equal(foodSecProcessor.funcTitleCase("abc"), "Abc");
  });

});


describe("testHFIAS", () => {

  it("test_getHFIAS", () => {
    //console.log(dataList);
    assert.equal(foodSecProcessor.getHFIAS(dataList[0]).api_hfias_status, "moderately_fi");
    assert.equal(foodSecProcessor.getHFIAS(dataList[1]).api_hfias_status, "severely_fi");
    assert.equal(foodSecProcessor.getHFIAS(dataList[2]).api_hfias_status, "moderately_fi");
    assert.equal(foodSecProcessor.getHFIAS(dataList[3]).api_hfias_status, "moderately_fi");
    assert.equal(foodSecProcessor.getHFIAS(dataList[4]).api_hfias_status, null);
    assert.equal(foodSecProcessor.getHFIAS(dataList[5]).api_hfias_status, null);
    assert.equal(foodSecProcessor.getHFIAS(dataList[6]).api_hfias_status, "food_secure");
    assert.equal(foodSecProcessor.getHFIAS(dataList[7]).api_hfias_status, "food_secure");
    assert.equal(foodSecProcessor.getHFIAS(dataList[8]).api_hfias_status, "mildly_fi");
    assert.equal(foodSecProcessor.getHFIAS(dataList[9]).api_hfias_status, "mildly_fi");
  });

  it("test_isStandardHFIAS", () => {
    assert.equal(foodSecProcessor.isStandardHFIAS("s"), false);
    assert.equal(foodSecProcessor.isStandardHFIAS(""), false);
    assert.equal(foodSecProcessor.isStandardHFIAS(null), false);
    assert.equal(foodSecProcessor.isStandardHFIAS("moderateLY_FI"), true);
  });

});
