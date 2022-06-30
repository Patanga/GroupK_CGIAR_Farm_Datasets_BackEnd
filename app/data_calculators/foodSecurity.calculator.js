const monthsMap = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
};

const foodMap = {
  grainsrootstubers: 1, legumes: 2, nuts_seeds: 3, veg_leafy: 4, vita_veg_fruit: 5,
  vegetables: 6, fruits: 7, meat: 8, eggs: 9, milk_dairy: 10
};


// wzj
const count = (dataForAPIList, countType) => {
  function insert(counter, treeNode) {
    if (treeNode === null) {
      treeNode = {
        Name: counter, count: 1,
        left: null,
        right: null
      };
    } else if (counter === treeNode.Name) {
      treeNode.count += 1;
    } else if (counter < treeNode.Name) {
      treeNode.left = insert(counter, treeNode.left);
    } else {
      treeNode.right = insert(counter, treeNode.right);
    }

    return treeNode;
  }

  function flattenForPie(treeNode) {
    if (treeNode === null) {
      return [];
    } else {
      return [...flattenForPie(treeNode.left),
        {"value": treeNode.count, "name": treeNode.Name},
        ...flattenForPie(treeNode.right)];
    }
  }

  function flattenForBar(treeNode) {
    if (treeNode === null) {
      return [];
    } else {
      return [...flattenForBar(treeNode.left),
        [ treeNode.Name, treeNode.count ],
        ...flattenForBar(treeNode.right)];
    }
  }

  let root = null;
  switch(countType) {
    case "HFIAS":
      dataForAPIList.forEach(data => {
        let hfiasStatus = data.api_hfias_status;
        if(hfiasStatus !== null) {
          root = insert(hfiasStatus, root);
        }
      });
      return flattenForPie(root);

    case "FoodShortage":
      dataForAPIList.forEach(data => {
        let months = data.api_food_shortage_months;
        if(months.length > 0) {
          months.forEach(month => root = insert(month, root));
        }
      });
      return flattenForBar(root);

    case "FoodConsumed":
      let rootLean = null;
      dataForAPIList.forEach(data => {
        let foodsFlush = data.api_food_flush;
        let foodsLean = data.api_food_lean;
        if(foodsFlush.length > 0) {
          foodsFlush.forEach(food => root = insert(food, root));
        }
        if(foodsLean.length > 0) {
          foodsLean.forEach(food => rootLean = insert(food, rootLean));
        }
      });
      return {
        food_flush: flattenForBar(root),
        food_lean: flattenForBar(rootLean)
      };

    default:
      return null;
  }
};
exports.count = count;

//
exports.buildFoodShortageData = (dataForAPIList) => {
  let result = count(dataForAPIList, "FoodShortage");
  result = sortByMap(result, monthsMap);

  const sum = dataForAPIList.reduce((preResult, data) =>
    preResult + data.api_food_shortage_months.length, 0);
  let aveNum = sum / dataForAPIList.length;

  return {dataset: result, average: aveNum}
};

//
exports.buildHDDSData = (dataForAPIList) => {
  let resultLean = dataForAPIList.map(dataObj => dataObj.api_hdds_lean);
  let resultFlush = dataForAPIList.map(dataObj => dataObj.api_hdds_flush);
  return [resultLean.filter(num => num >= 0), resultFlush.filter(num => num >= 0)];
};

//
exports.buildFoodConsumedData = (dataForAPIList) => {
  let resultOfCount = count(dataForAPIList, "FoodConsumed");
  let resultLean = resultOfCount.food_lean;
  let resultFlush = resultOfCount.food_flush;
  resultLean = sortByMap(resultLean, foodMap);
  resultFlush = sortByMap(resultFlush, foodMap);

  return resultLean.map((food, index) =>
    [...food, resultFlush[index][1]]
  );
};


const getKeysOfArray = (dataList) => dataList.map(dataArray => dataArray[0]);

const sortByMap = (dataList, dataMap) => {
  let newDataList = [...dataList];
  const existedKeys = getKeysOfArray(newDataList);
  Object.keys(dataMap).forEach(key => {
    if(! existedKeys.includes(key)) {
      newDataList = [...newDataList, [key, 0]];
    }
  });
  return newDataList.sort((a, b) => dataMap[a[0]] - dataMap[b[0]]);
};







