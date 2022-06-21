
// wzj
exports.count = (DataForAPIList) => {
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
  DataForAPIList.forEach(data => {
    let hfiasStatus = data.api_hfias_status;
    if(hfiasStatus !== null) {
      root = insert(hfiasStatus, root);
    }
  });
  return flatten(root);
};




