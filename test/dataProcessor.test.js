const assert = require("assert");
const processor = require("../app/controllers/dataProcessor.js");
const dt = require("../data_test/data_test.js");

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


describe("testProcessor", () => {
  const rawDataList = processor.getRawData(dt.indicatorDataList, dt.processedDataList);
  //console.log(rawDataList[3]);
  const propFixed3 = [
    ["id_unique", "0ccb14dd3c0262f22a30120f5e65b721"],
    ["id_proj", "cir"],
    ["id_form", "bf_cir_2018"],
    ["id_country", ],
    ["region", "hauts bassins"]
  ];
  const propAPI3 = [
    ["api_hfias_status", ],
    ["api_food_shortage_months", ],
    ["api_food_shortage_months_num", ],
    ["api_hdds_good_season", ],
    ["api_hdds_bad_season", ],
  ];

  it("test_getDataForAPI", () => {
    let result = processor.getDataForAPI(rawDataList);
    console.log(result);
    console.log(result[3]);

    propFixed3.forEach(prop => {
      assert.equal(result[3][prop[0]], prop[1]);
    });

  });

  it("test_getFoodShortage", () => {
    let result0 = processor.getFoodShortage(rawDataList[0]);
    //console.log(result0);
    assert.equal(result0["api_food_shortage_months_num"], 2);
    assert.equal(result0["api_food_shortage_months"][0], "Aug");

    let result8 = processor.getFoodShortage(rawDataList[8]);
    //console.log(rawDataList[8]);
    assert.equal(result8["api_food_shortage_months_num"], 3);
    assert.equal(result8["api_food_shortage_months"][1], "Jun");

    let resultTest = processor.getFoodShortage(
      {foodshortagetime_months_which : "ss"});
    //console.log(resultTest);
    assert.equal(resultTest["api_food_shortage_months_num"], 0);

    resultTest = processor.getFoodShortage(
      {foodshortagetime_months_which : "Aug   s"});
    //console.log(resultTest);
    assert.equal(resultTest["api_food_shortage_months_num"], 1);
  });

  it("test_funcTitleCase", () => {
    assert.equal(processor.funcTitleCase("abc"), "Abc");
  });

});

describe("testFilter", () => {

  it("test_getRawData", () => {
    let resultList = processor.getRawData(dt.indicatorDataList, dt.processedDataList);
    //console.log(resultList);
    assert.equal(resultList.length, 65);
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