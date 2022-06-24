const assert = require("assert");
const dt = require("../data_test/data_test.js");
const fs = require("../app/controllers/foodSecurity.js");
const processor = require("../app/controllers/dataProcessor.js");

const makeDataList = () => {
  let indicatorData1 = {
    fies_score: "4", hfias_status: "food_secure",
    foodshortagetime_months_which: "jun jul sep aug",
    dataType: "indicator_data",
    formID: "bf_adn_2019"
  }

  let indicatorData2 = {
    fies_score: "6", hfias_status: "food_secure",
    foodshortagetime_months_which: "jun jul aug",
    dataType: "indicator_data",
    formID: "bf_adn_2019"
  }

  let indicatorData3 = {
    fies_score: null, hfias_status: "moderately_fi",
    foodshortagetime_months_which: "",
    dataType: "indicator_data",
    formID: "la_ham_2016"
  }

  let indicatorData4 = {
    fies_score: -1, hfias_status: "moderateLY_FI",
    foodshortagetime_months_which: "aug jul jun may sep",
  }

  let indicatorData5 = {
    fies_score: null, hfias_status: null,
    foodshortagetime_months_which: "sd",
  }

  let indicatorData6 = {
    fies_score: null, hfias_status: "ss",
    foodshortagetime_months_which: "jan oct jul",
  }

  let list =  [indicatorData1, indicatorData2, indicatorData3, indicatorData4,
    indicatorData5, indicatorData6];

  list[6] = { fies_score: 0, hfias_status: "ss",
    foodshortagetime_months_which: "oct jul",};
  list[7] = { fies_score: null, hfias_status: "food_secure",
    foodshortagetime_months_which: " oct aug sep",};
  list[8] = { fies_score: null, hfias_status: "MILDly_fi",
    foodshortagetime_months_which: "",};
  list[9] = { fies_score: 1, hfias_status: null,
    foodshortagetime_months_which: "",};

  return list;
}

let dataList = makeDataList();
exports.dataList = dataList; // export for test

const selectedDataList = processor.getSelectedRawData(dt.indicatorDataList, dt.processedDataList);


describe("testFoodSecurity", () => {

  it("test_count_FoodShortage", () => {
    let tmpResult = processor.getDataForAPI(dataList);
    //console.log(tmpResult);
    let result = fs.buildFoodSecurityData(tmpResult);
    //console.log(result);
    result.dataset.forEach(month => {
      switch (month[0]) {
        case "Jun":
          assert.equal(month[1], 3);
          break;
        case "Aug":
          assert.equal(month[1], 4);
          break;
        case "Oct":
          assert.equal(month[1], 3);
          break;
      }
    });
    assert.equal(result.average, 2);

    tmpResult = processor.getDataForAPI(selectedDataList);
    //console.log(tmpResult);
    result = fs.buildFoodSecurityData(tmpResult);
    console.log(result);
    result.dataset.forEach(month => {
      switch (month[0]) {
        case "Jun":
          assert.equal(month[1], 33);
          break;
        case "Aug":
          assert.equal(month[1], 35);
          break;
        case "Oct":
          assert.equal(month[1], 2);
          break;
      }
    });
    assert.equal(result.average.toFixed(2), 2.52);
  });

  it("test_count_HFIAS", () => {
    let tmpResult = processor.getDataForAPI(dataList);
    //console.log(tmpResult);
    let result = fs.count(tmpResult, "HFIAS");
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
    assert.equal(result[1].name, "mildly_fi");
    assert.equal(result[1].value, 2);
    assert.equal(result[2].name, "moderately_fi");
    assert.equal(result[2].value, 3);
    assert.equal(result[3].name, "severely_fi");
    assert.equal(result[3].value, 1);

    tmpResult = processor.getDataForAPI(selectedDataList);
    console.log(tmpResult);
    result = fs.count(tmpResult, "HFIAS");
    //console.log(result);
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
    assert.equal(result[1].name, "mildly_fi");
    assert.equal(result[1].value, 4);
    assert.equal(result[2].name, "moderately_fi");
    assert.equal(result[2].value, 23);
    assert.equal(result[3].name, "severely_fi");
    assert.equal(result[3].value, 36);
  });

});