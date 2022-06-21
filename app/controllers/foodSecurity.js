
// wzj
exports.count = (indicatorDataList) => {
  function insert(hfiasStatus, treeNode) {
    if (treeNode === null) {
      treeNode = {
        HFIAS: hfiasStatus, count: 1,
        left: null,
        right: null
      };
    } else if (hfiasStatus === treeNode.HFIAS) {
      treeNode.count += 1;
    } else if (hfiasStatus < treeNode.HFIAS) {
      treeNode.left = insert(hfiasStatus, treeNode.left);
    } else {
      treeNode.right = insert(hfiasStatus, treeNode.right);
    }

    return treeNode;
  }

  function flatten(treeNode) {
    if (treeNode === null) {
      return [];
    } else {
      return [...flatten(treeNode.left),
        {"value": treeNode.count, "name": treeNode.HFIAS},
        ...flatten(treeNode.right)];
    }
  }

  let root = null;
  indicatorDataList.forEach(data => {
    let hfiasStatus = getHFIAS(data);
    if(hfiasStatus !== null) {
      root = insert(hfiasStatus, root);
    }
  });
  return flatten(root);
};




const getHFIAS = (indicatorData) => {
  let fiesScore = parseInt(indicatorData.data.fies_score);
  let hfiasTmp = indicatorData.data.hfias_status;
  let hfiasStatus;
  if (!isNaN(fiesScore)) {
    if (fiesScore === 0) {
      hfiasStatus = "food_secure";
    } else if (fiesScore === 1) {
      hfiasStatus = "mildly_fi";
    } else if (fiesScore >= 2 && fiesScore <= 4) {
      hfiasStatus = "moderately_fi";
    } else if (fiesScore > 4) {
      hfiasStatus = "severely_fi";
    } else {
      hfiasStatus = isStandardHFIAS(hfiasTmp) ? hfiasTmp.toLowerCase() : null;
    }
  } else {
    hfiasStatus = isStandardHFIAS(hfiasTmp) ? hfiasTmp.toLowerCase() : null;
  }

  return hfiasStatus;
}
exports.getHFIAS = getHFIAS; // export for test

const isStandardHFIAS = (string) => {
  if (typeof(string) !== "string") {
    return false;
  }
  const standardHFIAS = [
    "food_secure",
    "mildly_fi",
    "moderately_fi",
    "severely_fi",
  ];
  return standardHFIAS.includes(string.toLowerCase());
}
exports.isStandardHFIAS = isStandardHFIAS; // export for test