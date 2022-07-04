//Choose which page of API
const basicProcessor = require("./grouping.processor");

const homeProcessor = require("./homePage.processor");
const liveProcessor = require("./livelihoods.processor");
const foodSecProcessor = require("./foodSecurity.processor");
const cropsProcessor = require("./crops.processor");
const livestockProcessor = require("./livestock.processor");
const offFarmProcessor = require("./offFarm.processor");


const processorList = [basicProcessor, homeProcessor, liveProcessor,
  foodSecProcessor, livestockProcessor, offFarmProcessor];

const buildProcessorOfAllPages = (processorList) => {
  let keysOfProcessed = processorList.reduce(
    (preResult, proc) => new Set([...preResult, ...proc.keysOfSelect.processed]),
    []
  );

  let keysOfIndicator = processorList.reduce(
    (preResult, proc) => new Set([...preResult, ...proc.keysOfSelect.indicator]),
    []
  );

  const keysOfSelect = {
    indicator: Array.from(keysOfIndicator),
    processed: Array.from(keysOfProcessed)
  };

  const keysOfOmit = Array.from(processorList.reduce(
    (preResult, proc) => new Set([...preResult, ...proc.keysOfOmit]),
    []
  ));

  const combineKeys = (dataObj) => {
    return processorList.reduce(
      (preResult, proc) => ({...preResult, ...proc.getAPIKeys(dataObj)}), {}
    );
  };

  return {
    keysOfSelect: keysOfSelect,
    keysOfOmit: keysOfOmit,
    getAPIKeys: combineKeys
  };
};
exports.buildProcessorOfAllPages = buildProcessorOfAllPages;  // export for test


const pageMap = {
  basic: basicProcessor,

  hp: homeProcessor,
  ll: liveProcessor,
  fs: foodSecProcessor,
  cp: cropsProcessor,
  ls: livestockProcessor,
  of: offFarmProcessor,

  all: buildProcessorOfAllPages(processorList),
};
exports.pageMap = pageMap; // export for test


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*                        Building data for API                             */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
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

const combineAttributes = (selectedDataList, pageType) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign(newObj, selectedDataObj,
      pageMap[pageType].getAPIKeys(selectedDataObj));
    return omitProperties(newObj, pageMap[pageType].keysOfOmit);
  });
};
exports.combineAttributes = combineAttributes;


exports.getDataForAPI = (pageType, indicatorDataList, processedDataList) => {
  const selectedDataList = getSelectedRawData(indicatorDataList, processedDataList,
    pageMap[pageType].keysOfSelect);
  return combineAttributes(selectedDataList, pageType);
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