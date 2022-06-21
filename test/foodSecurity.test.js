const assert = require("assert");
const fs = require("../app/controllers/foodSecurity.js");
const dt = require("../data_test/data_test.js");

const makeDataList = () => {
  let indicatorData1 = {
    data: {fies_score: "4", hfias_status: "food_secure"},
    dataType: "indicator_data",
    formID: "bf_adn_2019"
  }

  let indicatorData2 = {
    data: {fies_score: "6", hfias_status: "food_secure"},
    dataType: "indicator_data",
    formID: "bf_adn_2019"
  }

  let indicatorData3 = {
    data: {fies_score: null, hfias_status: "moderately_fi"},
    dataType: "indicator_data",
    formID: "la_ham_2016"
  }

  let indicatorData4 = {
    data: {fies_score: -1, hfias_status: "moderateLY_FI"}
  }

  let indicatorData5 = {
    data: {fies_score: null, hfias_status: null}
  }

  let indicatorData6 = {
    data: {fies_score: null, hfias_status: "ss"}
  }

  let list =  [indicatorData1, indicatorData2, indicatorData3, indicatorData4,
    indicatorData5, indicatorData6];

  list[6] = { data: {fies_score: 0, hfias_status: "ss"} };
  list[7] = { data: {fies_score: null, hfias_status: "food_secure"} };
  list[8] = { data: {fies_score: null, hfias_status: "MILDly_fi"} };
  list[9] = { data: {fies_score: 1, hfias_status: null} };

  return list;
}

let dataList = makeDataList();


describe("testHFIAS", () => {
  it("test_count", () => {
    let result = fs.count(dataList);
    //console.log(result);
    assert.equal(result[0].name, "food_secure");
    assert.equal(result[0].value, 2);
    assert.equal(result[1].name, "mildly_fi");
    assert.equal(result[1].value, 2);
    assert.equal(result[2].name, "moderately_fi");
    assert.equal(result[2].value, 3);
    assert.equal(result[3].name, "severely_fi");
    assert.equal(result[3].value, 1);

    result = fs.count(dt.indicatorDataList);
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

  it("test_isStandardHFIAS", () => {
    assert.equal(fs.isStandardHFIAS("s"), false);
    assert.equal(fs.isStandardHFIAS(""), false);
    assert.equal(fs.isStandardHFIAS(null), false);
    assert.equal(fs.isStandardHFIAS("moderateLY_FI"), true);
  });

  it("test_getHFIAS", () => {
    assert.equal(fs.getHFIAS(dataList[0]), "moderately_fi");
    assert.equal(fs.getHFIAS(dataList[1]), "severely_fi");
    assert.equal(fs.getHFIAS(dataList[2]), "moderately_fi");
    assert.equal(fs.getHFIAS(dataList[3]), "moderately_fi");
    assert.equal(fs.getHFIAS(dataList[4]), null);
    assert.equal(fs.getHFIAS(dataList[5]), null);
    assert.equal(fs.getHFIAS(dataList[6]), "food_secure");
    assert.equal(fs.getHFIAS(dataList[7]), "food_secure");
    assert.equal(fs.getHFIAS(dataList[8]), "mildly_fi");
    assert.equal(fs.getHFIAS(dataList[9]), "mildly_fi");
  });
});