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
    case "Frequency":
      dataForAPIList.forEach(data => {
        let animals = data.api_livestocks_kept;
        animals.forEach(animal => {
          if (animal[1] > 0) {
            root = insert(animal[0], root);
          }
        });
      });
      return flattenForBar(root);

    default:
      return null;
  }
};
exports.count = count;

//
exports.buildHeadsData = (dataForAPIList) => {
  let result = {};
  dataForAPIList.forEach(dataObj => {
    let animals = dataObj.api_livestocks_kept;
    animals.forEach(animal => {
      if (! Object.keys(result).includes(animal[0])) {
        result = {...result, [animal[0]]: [animal[1]]}
      } else {
        result[animal[0]].push(animal[1]);
      }
    });

  });

  return result;
};
