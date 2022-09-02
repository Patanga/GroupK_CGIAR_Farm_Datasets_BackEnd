const group = require("./grouping.processor.js");

let keysOfProcessed = [
  "id_unique"
];
keysOfProcessed = keysOfProcessed.concat(group.keysOfGroupingInProcessed);

// Define which keys needs convertion to numbers
let numKeys = [
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
exports.numKeys = numKeys;

let keysOfIndicator = [
  "id_unique",
].concat(numKeys);


// Define which original keys to be selected
const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect;


// Define which original keys to be omitted
let keysOfOmit = numKeys;
exports.keysOfOmit = keysOfOmit;


// Define how to transform original keys to API keys
const getAPIKeys = (dataObj) => {
  let newObj = {};
  Object.assign(newObj, group.getAPIKeys(dataObj), getIncome(dataObj), getAllValue(dataObj));
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
const getIncome = (doc) => {
  // parse numbers first
  const year = parseInt(doc.year)
  const days = (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 366 : 365
  const mae = parseFloat(doc.hh_size_mae)
  const rate = parseFloat(doc.currency_conversion_lcu_to_ppp)
  let res = null;

  // Does it need illegal value like null check here?
  if (!year || !days || !mae || !rate) {
    //console.log('Invalid record for getIncome, id_uique: ' + doc.id_unique)
    //console.log('year: ' + year + ' mae:' + mae + ' rate: ' + rate)
    // return null
  }
  else {
    res = parseFloat(doc.total_income_lcu_per_year) / days / mae / rate;
  }
  // NaN to 0
  return { api_tot_ppp_income_pd_pmae: res ? res : 0 }
};
exports.getIncome = getIncome;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting all value data converted              */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// All keys in NumKeys will be converted
const getAllValue = (doc) => {
  return {
    year: parseInt(doc.year),
    api_mae: parseFloat(doc.hh_size_mae),
    api_currency_conversion: _parseFloat(doc.currency_conversion_lcu_to_ppp),
    api_income_lstk_ppp_pd_pmae: valueConvert(doc, "livestock_income_lcu_per_year"),
    api_income_crop_ppp_pd_pmae: valueConvert(doc, "crop_income_lcu_per_year"),
    api_income_offfarm_ppp_pd_pmae: valueConvert(doc, "off_farm_income_lcu_per_year"),
    api_cons_lstk_ppp_pd_pmae: valueConvert(doc, "value_livestock_products_consumed_lcu_per_hh_per_year"),
    api_cons_crop_ppp_pd_pmae: valueConvert(doc, "value_crop_consumed_lcu_per_hh_per_year"),
  }
}
// Prevent NaN in parseFloat
const _parseFloat = (num) => {
  let rval = parseFloat(num);
  return isNaN(rval) ? null : rval;
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Function for converting value data                         */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Convert lcu yearly household value to ppp daily per mae
valueConvert = function (doc, keyName) {
  // parse numbers first
  const year = parseInt(doc.year)
  const days = (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 366 : 365
  const mae = parseFloat(doc.hh_size_mae)
  const rate = parseFloat(doc.currency_conversion_lcu_to_ppp)
  if (!doc.hasOwnProperty(keyName)) {
    //console.log('Invalid record for valueConvert, missing' + keyName + ' as property' + 'id_unique: ' + doc.id_unique)
    return 0
  }
  // Does it need illegal value like null check here?
  if (!year || !days || !mae || !rate || !doc[keyName]) {
    //console.log('Invalid record for valueConvert, id_unique: ' + doc.id_unique)
    //console.log('\tyear: ' + year + ' mae:' + mae + ' rate: ' + rate + ' ' + keyName + ': ' + doc[keyName])
    return 0
  }
  return doc[keyName] / rate / mae / days
}
