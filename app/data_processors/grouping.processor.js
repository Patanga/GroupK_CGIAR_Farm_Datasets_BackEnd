const keysOfGroupingInProcessed = [
  "id_country",
  "region",
  "id_proj",
  "id_form"
];
exports.keysOfGroupingInProcessed = keysOfGroupingInProcessed;

let keysOfProcessed = ["id_unique"];
keysOfProcessed = keysOfProcessed.concat(keysOfGroupingInProcessed);

let keysOfIndicator = ["id_unique"];


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
  Object.assign( newObj, getCountry(dataObj), getRegion(dataObj));
  return newObj;
};
exports.getAPIKeys = getAPIKeys;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*                    Functions for getting country data                    */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const countryMap = {
  BF: "Burkina Faso",
  BI: "Burundi",
  BO: "Bolivia",
  CD: "DRC",
  CI: "Cote d’Ivoire",
  CR: "Costa Rica",
  EC: "Ecuador",
  ET: "Ethiopia",
  GH: "Ghana",
  GT: "Guatemala",
  HN: "Honduras",
  IN: "India",
  KE: "Kenya",
  KH: "Cambodia",
  KM: "Comoros",
  LA: "LaoPDR",
  MA: "Morocco",

  ML: "Mali",
  MW: "Malawi",
  NE: "Niger",
  NG: "Nigeria",
  NI: "Nicaragua",
  PE: "Peru",
  PS: "Palestine",
  RW: "Rwanda",
  SL: "Sierra Leone",
  SN: "Senegal",
  SV: "El Salvador",
  TZ: "Tanzania",
  UG: "Uganda",
  VN: "Vietnam",
  ZA: "South Africa",
  ZM: "Zambia"
};

const getCountry = (dataObj) => {
  let country = "others";
  if (typeof(dataObj.id_country) === "string") {
    country = countryMap[dataObj.id_country.toUpperCase()];
    country = country || "others";
  }

  return {id_country: country};
};
exports.getCountry = getCountry; // export for test

const getRegion = (dataObj) => {
  let region = "others";
  if (typeof(dataObj.region) === "string") {
    const regex = new RegExp("^[\\w\\s]+$");
    region = dataObj.region.toLowerCase();
    region = region.replace(/[_-]/g, " ");
    region = regex.test(region) ? region : "others";
  }

  return {region: region};
};
exports.getRegion = getRegion; // export for test
