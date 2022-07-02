const keysOfGroupingInProcessed = [
  "id_unique",
  "id_country",
  "region",
  "id_proj",
  "id_form"
];
exports.keysOfGroupingInProcessed = keysOfGroupingInProcessed;

let keysOfProcessed = keysOfGroupingInProcessed;

let keysOfIndicator = ["id_unique"];


const KeysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};


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


//
const getSelectedRawData = (indicatorDataList, processedDataList, selectKeys) => {
  let dataListOfIndicator = indicatorDataList.map(indicatorData => indicatorData.data);
  let rawDataOfIndicator = dataListOfIndicator.map(data => pickProperties(data, selectKeys.indicator));
  let idListOfIndicator = rawDataOfIndicator.map(data => data.id_unique);

  let dataListOfProcessed = processedDataList.map(processedData => processedData.data);
  let rawDataOfProcessed = dataListOfProcessed.map(data => pickProperties(data, selectKeys.processed));
  let idListOfProcessed = rawDataOfProcessed.map(data => data.id_unique);

  // 取id的交集后排序 wzj
  const intersect = idListOfIndicator.filter(id => idListOfProcessed.includes(id));
  rawDataOfIndicator = rawDataOfIndicator.filter(data => intersect.includes(data.id_unique));
  rawDataOfProcessed = rawDataOfProcessed.filter(data => intersect.includes(data.id_unique));
  rawDataOfIndicator.sort(funcSortById);
  rawDataOfProcessed.sort(funcSortById);

  let rawData = rawDataOfProcessed.map((obj, index) => {
    let newObj = {};
    Object.assign(newObj, obj, rawDataOfIndicator[index]);
    return newObj;
  });

  console.log(rawData.length + " records of combination raw data");
  return rawData;
};
exports.getSelectedRawData = getSelectedRawData;


//
const getGroupingData = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, getCountry(dataObj));
  return newObj;
};
exports.getGroupingData = getGroupingData;


//
const getCountry = (dataObj) => {
  const country = countryMap[dataObj.id_country.toUpperCase()];
  return {id_country: country};
};



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*                           Auxiliary Functions                            */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//
const pickProperties = (data, selectKeys) => {
  let properties = selectKeys.map(key => {
    return (key in data ? {[key]: data[key]} : {})
  });

  return properties.reduce((preResult, prop) => Object.assign(preResult, prop), {})
}
exports.pickProperties = pickProperties; // export for test

//
const omitProperties = (data, selectKeys) => {
  let properties = Object.keys(data).map(key => {
    return (selectKeys.includes(key) ? {} : {[key]: data[key]})
  });

  return properties.reduce((preResult, prop) => Object.assign(preResult, prop), {})
}
exports.omitProperties = omitProperties; // export for test


//
const funcSortById = (a, b) => {
  const idA = a["id_unique"];
  const idB = b["id_unique"];
  if (idA > idB) {
    return 1;
  } else if (idA < idB) {
    return -1;
  } else {
    return 0;
  }
};