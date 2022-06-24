const monthsMap = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
};


// wzj
const count = (DataForAPIList, countType) => {
  function insert(hfiasStatus, treeNode) {
    if (treeNode === null) {
      treeNode = {
        Name: hfiasStatus, count: 1,
        left: null,
        right: null
      };
    } else if (hfiasStatus === treeNode.Name) {
      treeNode.count += 1;
    } else if (hfiasStatus < treeNode.Name) {
      treeNode.left = insert(hfiasStatus, treeNode.left);
    } else {
      treeNode.right = insert(hfiasStatus, treeNode.right);
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
      DataForAPIList.forEach(data => {
        let hfiasStatus = data.api_hfias_status;
        if(hfiasStatus !== null) {
          root = insert(hfiasStatus, root);
        }
      });
      return flattenForPie(root);

    case "FoodShortage":
      DataForAPIList.forEach(data => {
        let months = data.api_food_shortage_months;
        if(months.length > 0) {
          months.forEach(month => root = insert(month, root));
        }
      });
      return flattenForBar(root);

    default:
      return null;
  }
};
exports.count = count;

//
exports.buildFoodSecurityData = (dataForAPIList) => {
  let result = count(dataForAPIList, "FoodShortage");
  const existedMonths = getKeysOfArray(result);
  Object.keys(monthsMap).forEach(month => {
    if(! existedMonths.includes(month)) {
      result = result.concat([[month, 0]]);
    }
  });
  result = result.sort(
(a, b) => monthsMap[a[0]] - monthsMap[b[0]]
  );

  const sum = dataForAPIList.reduce((preResult, data) => {
    preResult += data.api_food_shortage_months_num;
    return preResult;
  }, 0);
  let aveNum = sum / dataForAPIList.length;

  return {dataset: result, average: aveNum}
};

const getKeysOfArray = (dataList) => dataList.map(dataArray => dataArray[0]);







