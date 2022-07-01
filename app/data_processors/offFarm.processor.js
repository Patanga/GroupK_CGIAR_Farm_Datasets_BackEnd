const {keysOfGroupingInProcessed, getSelectedRawData, getGroupingData,
  omitProperties} = require("./basic.processor.js");

const offfarm_month = [
  "offfarm_month_1",//个人
  "offfarm_month_2",//个人
  "offfarm_month_3",//个人
  "offfarm_month_4",//个人
  "offfarm_month_5",//个人
  "offfarm_month_6",//个人
];

let keysOfProcessed = [
  "offfarm_income_proportion",//个人
  "offfarm_incomes",//个人
  "spending_off_farm_income",//个人
];
keysOfProcessed = keysOfProcessed.concat(keysOfGroupingInProcessed, offfarm_month);

let keysOfIndicator = [
  "id_unique"
];


const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect; // export for test

let keysOfOmit = [
];
keysOfOmit = keysOfOmit.concat(offfarm_month);
exports.keysOfOmit = keysOfOmit;


//
const combineAttributes = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getGroupingData(selectedDataObj),
      getOffFarmMonth(selectedDataObj)
    );
    return omitProperties(newObj, keysOfOmit);
  });
};
exports.combineAttributes = combineAttributes;


exports.getDataForAPI = (indicatorDataList, processedDataList) => {
  const selectedDataList = getSelectedRawData(indicatorDataList, processedDataList,
    keysOfSelect);
  return combineAttributes(selectedDataList);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting  data            */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getOffFarmMonth = (dataObj) => {
  let s= dataObj.offfarm_month_1;
  let result = [];


  return { api_off_farm_months: result};
};
exports.getOffFarmMonth = getOffFarmMonth;