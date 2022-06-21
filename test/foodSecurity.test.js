const assert = require("assert");
const dt = require("../data_test/data_test.js");
const fs = require("../app/controllers/foodSecurity.js");
const processor = require("../app/controllers/dataProcessor.js");

const makeDataList = () => {
  let indicatorData1 = {
    fies_score: "4", hfias_status: "food_secure",
    dataType: "indicator_data",
    formID: "bf_adn_2019"
  }

  let indicatorData2 = {
    fies_score: "6", hfias_status: "food_secure",
    dataType: "indicator_data",
    formID: "bf_adn_2019"
  }

  let indicatorData3 = {
    fies_score: null, hfias_status: "moderately_fi",
    dataType: "indicator_data",
    formID: "la_ham_2016"
  }

  let indicatorData4 = {
    fies_score: -1, hfias_status: "moderateLY_FI"
  }

  let indicatorData5 = {
    fies_score: null, hfias_status: null
  }

  let indicatorData6 = {
    fies_score: null, hfias_status: "ss"
  }

  let list =  [indicatorData1, indicatorData2, indicatorData3, indicatorData4,
    indicatorData5, indicatorData6];

  list[6] = { fies_score: 0, hfias_status: "ss" };
  list[7] = { fies_score: null, hfias_status: "food_secure" };
  list[8] = { fies_score: null, hfias_status: "MILDly_fi" };
  list[9] = { fies_score: 1, hfias_status: null };

  return list;
}

let dataList = makeDataList();
exports.dataList = dataList; // export for test

const selectedDataList = processor.getSelectedRawData(dt.indicatorDataList, dt.processedDataList);


describe("testFoodSecurity", () => {
  it("test_count", () => {
    let tmpResult = processor.getDataForAPI(dataList);
    //console.log(tmpResult);
    let result = fs.count(tmpResult);
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
    result = fs.count(tmpResult);
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