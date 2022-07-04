const assert = require("assert");
const dt = require("../data_test/data_test.js");
const basic = require("../app/data_processors/grouping.processor.js");
const foodSecProcessor = require("../app/data_processors/foodSecurity.processor");


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


describe("testBasicProcessor", () => {

  it("test_getSelectedRawData", () => {
    const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList,
      dt.processedDataList, foodSecProcessor.keysOfSelect);
    console.log(selectedDataList);
    assert.equal(selectedDataList.length, 65);
  });

  it("test_getGroupingData", () => {
    const selectedDataList = basic.getSelectedRawData(dt.indicatorDataList,
      dt.processedDataList, foodSecProcessor.keysOfSelect);
    console.log(selectedDataList[0]);

    console.log(basic.getGroupingData(selectedDataList[0]));

  });

  it("test_pick", () => {
    let dataI1 = dt.indicatorDataList[0].data;
    let dataP1 = dt.processedDataList[0].data;
    let dataP2 = dt.processedDataList[8].data;
    assert.equal(dataP2.id_hh, "44c111f2ac30052d0dadd7d19c55d43c");
    let newArray = goodSeason.concat(badSeason,lastMonth);
    let resultP1 = basic.pickProperties(dataP1, newArray);
    let resultP2 = basic.pickProperties(dataP2, newArray);

    let resultI1 = basic.pickProperties(dataI1, selectKeys);
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
    let resultI1 = basic.omitProperties(dataI1, selectKeys);
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
    let resultP2 = basic.omitProperties(dataP2, newArray);
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