const group = require("./grouping.processor.js");

let keysOfProcessed = [
  "id_unique"
];
keysOfProcessed = keysOfProcessed.concat(group.keysOfGroupingInProcessed);

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


// Define which original keys to be selected
const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect;


// Define which original keys to be omitted
let keysOfOmit = [];
exports.keysOfOmit = keysOfOmit;


// Define how to transform original keys to API keys
const getAPIKeys = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, group.getAPIKeys(dataObj), calAppendIncome(dataObj));
  return newObj;
};
exports.getAPIKeys = getAPIKeys;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting Average Income data                  */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
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
    //console.log('Invalid record for calAppendIncome, id_uique: ' + doc.id_unique)
    //console.log('year: ' + year + ' mae:' + mae + ' rate: ' + rate)
    // return null
  }
  else {
    res = parseFloat(doc.total_income_lcu_per_year) / days/ mae/ rate;
  }
  return { api_tot_ppp_income_pd_pmae: res }
};
exports.calAppendIncome = calAppendIncome;
