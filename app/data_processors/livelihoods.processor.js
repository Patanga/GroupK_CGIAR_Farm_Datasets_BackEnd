const {keysOfGroupingInProcessed, getSelectedRawData, getCountry,
  omitProperties} = require("./basic.processor.js");

let keysOfIndicator = [
  "id_unique",

  "year",
  "hh_size_members",
  "hh_size_mae",
  "currency_conversion_lcu_to_ppp",
  "crop_income_lcu_per_year",
  "livestock_income_lcu_per_year",
  "total_income_lcu_per_year",
  "off_farm_income_lcu_per_year",
  "value_crop_consumed_lcu_per_hh_per_year",
  "value_livestock_products_consumed_lcu_per_hh_per_year",
];


const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfGroupingInProcessed
};
exports.keysOfSelect = keysOfSelect; // export for test


let keysOfOmit = [
];


//
const combineAttributes = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj,
      calAppendIncome(selectedDataObj), getCountry(selectedDataObj));
    return omitProperties(newObj, keysOfOmit);
  });
};
exports.combineAttributes = combineAttributes;


exports.getDataForAPI = (indicatorDataList, processedDataList) => {
  const selectedDataList = getSelectedRawData(indicatorDataList, processedDataList,
    keysOfSelect);
  return combineAttributes(selectedDataList);
};


// Calculate the total income of a sample
// Convert value in ppp USD
// Per mae per day
// Returns with a new key named 'api_tot_ppp_income_pd_pmae' appended.
const calAppendIncome = (doc) => {
  // parse numbers first
  const year = parseInt(doc.year)
  const days = (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 366 : 365
  const mae = parseFloat(doc.hh_size_mae)
  const rate = parseFloat(doc.currency_conversion_lcu_to_ppp)
  let res = null;

  // Does it need illegal value like null check here?
  if (!year || !days || !mae || !rate) {
    console.log('Invalid record for calAppendIncome, id_uique: ' + doc.id_unique)
    console.log('year: ' + year + ' mae:' + mae + ' rate: ' + rate)
    // return null
  }
  else {
    res = parseFloat(doc.total_income_lcu_per_year) / days/ mae/ rate;
  }
  return { ...doc, api_tot_ppp_income_pd_pmae: res}
};
exports.calAppendIncome = calAppendIncome;
