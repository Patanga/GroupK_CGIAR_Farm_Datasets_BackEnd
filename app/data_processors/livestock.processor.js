const group = require("./grouping.processor.js");

//keys For Chart1 & Chart2
// For each household, sum up their value of key in keysForChart1_Chart2
const livestock_heads = [
  "livestock_heads_cattle",
  "livestock_heads_sheep",
  "livestock_heads_goats",
  "livestock_heads_pigs",
  "livestock_heads_chicken",
  "livestock_heads_otherpoultry",
  "livestock_heads_rabbits",
  "livestock_heads_fish",
  "livestock_heads_other_lstk",
  "livestock_heads_other2_lstk",
  "livestock_heads_other3_lstk",
  "livestock_heads_donkeys_horses",
  "livestock_heads_bees",
];

//keys For Chart3
/* There are three type of conducts - meat, eggs, milk
   Every conduct have 5 data
   For each household and each conduct, merge their value
 */
const livestock_products = [
  "meat_sold_props_numeric_1",
  "meat_consumed_props_numeric_1",
  "meat_sold_props_numeric_2",
  "meat_consumed_props_numeric_2",
  "meat_sold_props_numeric_3",
  "meat_consumed_props_numeric_3",
  "meat_sold_props_numeric_4",
  "meat_consumed_props_numeric_4",
  "meat_sold_props_numeric_5",
  "meat_consumed_props_numeric_5",

  "eggs_sold_prop_numeric_1",
  "eggs_consumed_prop_numeric_1",
  "eggs_sold_prop_numeric_2",
  "eggs_consumed_prop_numeric_2",
  "eggs_sold_prop_numeric_3",
  "eggs_consumed_prop_numeric_3",
  "eggs_sold_prop_numeric_4",
  "eggs_consumed_prop_numeric_4",
  "eggs_sold_prop_numeric_5",
  "eggs_consumed_prop_numeric_5",

  "milk_sold_prop_numeric_1",
  "milk_consumed_prop_numeric_1",
  "milk_sold_prop_numeric_2",
  "milk_consumed_prop_numeric_2",
  "milk_sold_prop_numeric_3",
  "milk_consumed_prop_numeric_3",
  "milk_sold_prop_numeric_4",
  "milk_consumed_prop_numeric_4",
  "milk_sold_prop_numeric_5",
  "milk_consumed_prop_numeric_5",
];

//keys For Chart4
/* To calculate the portion of "improved"
   For each household, if there is "improved"(string) in the value of keys, this household has improved breeds
   The result should be (household which has improved breeds/household number)
 */
const livestock_breeds = [
  "livestock_name_1",
  "livestock_breeds_1",
  "livestock_name_2",
  "livestock_breeds_2",
  "livestock_name_3",
  "livestock_breeds_3",
  "livestock_name_4",
  "livestock_breeds_4",
  "livestock_name_5",
  "livestock_breeds_5",
];

let keysOfProcessed = [
  "id_unique",
];
keysOfProcessed = keysOfProcessed.concat(group.keysOfGroupingInProcessed,
  livestock_heads, livestock_products, livestock_breeds);

let keysOfIndicator = [
  "id_unique"
];


// Define which original keys to be selected
const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect;


// Define which original keys to be omitted
let keysOfOmit = [
];
keysOfOmit = keysOfOmit.concat(livestock_heads, livestock_products, livestock_breeds);
exports.keysOfOmit = keysOfOmit;


// Define how to transform original keys to API keys
const getAPIKeys = (dataObj) => {
  let newObj = {};
  Object.assign( newObj, group.getAPIKeys(dataObj),
    getLivestockFrequency(dataObj), getLivestockUse(dataObj),
    getLivestockBreeds(dataObj));
  return newObj;
};
exports.getAPIKeys = getAPIKeys;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting Frequency Livestock kept data            */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getLivestockFrequency = (dataObj) => {
  // value -> int
  // How to make these a list?
  let cattle = dataObj.livestock_heads_cattle;
  let sheep = dataObj.livestock_heads_sheep;
  let goats = dataObj.livestock_heads_goats;
  let pigs = dataObj.livestock_heads_pigs;
  let chicken = dataObj.livestock_heads_chicken;
  let otherPoultry = dataObj.livestock_heads_otherpoultry;
  let rabbits = dataObj.livestock_heads_rabbits;
  let fish = dataObj.livestock_heads_fish;
  let other_lstk = dataObj.livestock_heads_other_lstk;
  let other2_lstk = dataObj.livestock_heads_other2_lstk;
  let other3_lstk = dataObj.livestock_heads_other3_lstk;
  let donkeys_horses = dataObj.livestock_heads_donkeys_horses;
  let bees = dataObj.livestock_heads_bees;

  //
  let cattle_amount = parseFloat(cattle);
  let sheep_amount = parseFloat(sheep);
  let goats_amount = parseFloat(goats);
  let pigs_amount = parseFloat(pigs);
  let chicken_amount = parseFloat(chicken);
  let otherPoultry_amount = parseFloat(otherPoultry);
  let rabbits_amount = parseFloat(rabbits);
  let fish_amount = parseFloat(fish);
  let other_lstk_amount = parseFloat(other_lstk);
  let other2_lstk_amount = parseFloat(other2_lstk);
  let other3_lstk_amount = parseFloat(other3_lstk);
  let donkeys_horses_amount = parseFloat(donkeys_horses);
  let bees_amount = parseFloat(bees);

  const animals =  {
    cattle: cattle_amount,
    sheep: sheep_amount,
    goats: goats_amount,
    pigs: pigs_amount,
    chicken: chicken_amount,
    otherpoultry: otherPoultry_amount,
    rabbits: rabbits_amount,
    fish: fish_amount,
    other_lstk: other_lstk_amount,
    other2_lstk: other2_lstk_amount,
    other3_lstk: other3_lstk_amount,
    donkeys_horses: donkeys_horses_amount,
    bees: bees_amount,
  };

  let animalsKept = Object.entries(animals).filter(
    animal => (!isNaN(animal[1])) && (animal[1] >= 0)
  );

  return { api_livestocks_kept: animalsKept };
};
exports.getLivestockFrequency = getLivestockFrequency;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting Livestock Use data                   */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getLivestockUse = (dataObj) => {
  //
  let meat_sold;
  let meat_sold_1 = parseFloat(dataObj.meat_sold_props_numeric_1);
  let meat_sold_2 = parseFloat(dataObj.meat_sold_props_numeric_2);
  let meat_sold_3 = parseFloat(dataObj.meat_sold_props_numeric_3);
  let meat_sold_4 = parseFloat(dataObj.meat_sold_props_numeric_4);
  let meat_sold_5 = parseFloat(dataObj.meat_sold_props_numeric_5);

  if (isNumber(meat_sold_1) && meat_sold_1 !== 0 ||
    isNumber(meat_sold_2) && meat_sold_2 !== 0 ||
    isNumber(meat_sold_3) && meat_sold_3 !== 0 ||
    isNumber(meat_sold_4) && meat_sold_4 !== 0 ||
    isNumber(meat_sold_5) && meat_sold_5 !== 0){
    meat_sold = 1;
  } else {
    meat_sold = 0;
  }

  let meat_consumed;
  let meat_consumed_1 = parseFloat(dataObj.meat_consumed_props_numeric_1);
  let meat_consumed_2 = parseFloat(dataObj.meat_consumed_props_numeric_2);
  let meat_consumed_3 = parseFloat(dataObj.meat_consumed_props_numeric_3);
  let meat_consumed_4 = parseFloat(dataObj.meat_consumed_props_numeric_4);
  let meat_consumed_5 = parseFloat(dataObj.meat_consumed_props_numeric_5);

  if (isNumber(meat_consumed_1) && meat_consumed_1 !== 0 ||
    isNumber(meat_consumed_2) && meat_consumed_2 !== 0 ||
    isNumber(meat_consumed_3) && meat_consumed_3 !== 0 ||
    isNumber(meat_consumed_4) && meat_consumed_4 !== 0 ||
    isNumber(meat_consumed_5) && meat_consumed_5 !== 0){
    meat_consumed = 1;
  } else {
    meat_consumed = 0;
  }

  //
  let eggs_sold;
  let eggs_sold_1 = parseFloat(dataObj.eggs_sold_prop_numeric_1);
  let eggs_sold_2 = parseFloat(dataObj.eggs_sold_prop_numeric_2);
  let eggs_sold_3 = parseFloat(dataObj.eggs_sold_prop_numeric_3);
  let eggs_sold_4 = parseFloat(dataObj.eggs_sold_prop_numeric_4);
  let eggs_sold_5 = parseFloat(dataObj.eggs_sold_prop_numeric_5);

  if (isNumber(eggs_sold_1) && eggs_sold_1 !== 0 ||
    isNumber(eggs_sold_2) && eggs_sold_2 !== 0 ||
    isNumber(eggs_sold_3) && eggs_sold_3 !== 0 ||
    isNumber(eggs_sold_4) && eggs_sold_4 !== 0 ||
    isNumber(eggs_sold_5) && eggs_sold_5 !== 0){
    eggs_sold = 1;
  } else {
    eggs_sold = 0;
  }

  let eggs_consumed;
  let eggs_consumed_1 = parseFloat(dataObj.eggs_consumed_prop_numeric_1);
  let eggs_consumed_2 = parseFloat(dataObj.eggs_consumed_prop_numeric_2);
  let eggs_consumed_3 = parseFloat(dataObj.eggs_consumed_prop_numeric_3);
  let eggs_consumed_4 = parseFloat(dataObj.eggs_consumed_prop_numeric_4);
  let eggs_consumed_5 = parseFloat(dataObj.eggs_consumed_prop_numeric_5);

  if (isNumber(eggs_consumed_1) && eggs_consumed_1 !== 0 ||
    isNumber(eggs_consumed_2) && eggs_consumed_2 !== 0 ||
    isNumber(eggs_consumed_3) && eggs_consumed_3 !== 0 ||
    isNumber(eggs_consumed_4) && eggs_consumed_4 !== 0 ||
    isNumber(eggs_consumed_5) && eggs_consumed_5 !== 0){
    eggs_consumed = 1;
  } else {
    eggs_consumed = 0;
  }

  //
  let milk_sold;
  let milk_sold_1 = parseFloat(dataObj.milk_sold_prop_numeric_1);
  let milk_sold_2 = parseFloat(dataObj.milk_sold_prop_numeric_2);
  let milk_sold_3 = parseFloat(dataObj.milk_sold_prop_numeric_3);
  let milk_sold_4 = parseFloat(dataObj.milk_sold_prop_numeric_4);
  let milk_sold_5 = parseFloat(dataObj.milk_sold_prop_numeric_5);

  if (isNumber(milk_sold_1) && milk_sold_1 !== 0 ||
    isNumber(milk_sold_2) && milk_sold_2 !== 0 ||
    isNumber(milk_sold_3) && milk_sold_3 !== 0 ||
    isNumber(milk_sold_4) && milk_sold_4 !== 0 ||
    isNumber(milk_sold_5) && milk_sold_5 !== 0){
    milk_sold = 1;
  } else {
    milk_sold = 0;
  }

  let milk_consumed;
  let milk_consumed_1 = parseFloat(dataObj.milk_consumed_prop_numeric_1);
  let milk_consumed_2 = parseFloat(dataObj.milk_consumed_prop_numeric_2);
  let milk_consumed_3 = parseFloat(dataObj.milk_consumed_prop_numeric_3);
  let milk_consumed_4 = parseFloat(dataObj.milk_consumed_prop_numeric_4);
  let milk_consumed_5 = parseFloat(dataObj.milk_consumed_prop_numeric_5);

  if (isNumber(milk_consumed_1) && milk_consumed_1 !== 0 ||
    isNumber(milk_consumed_2) && milk_consumed_2 !== 0 ||
    isNumber(milk_consumed_3) && milk_consumed_3 !== 0 ||
    isNumber(milk_consumed_4) && milk_consumed_4 !== 0 ||
    isNumber(milk_consumed_5) && milk_consumed_5 !== 0){
    milk_consumed = 1;
  } else {
    milk_consumed = 0;
  }

  return {
    api_meat_sold_consumed: [meat_sold, meat_consumed],
    api_eggs_sold_consumed: [eggs_sold, eggs_consumed],
    api_milk_sold_consumed: [milk_sold, milk_consumed]
  }
};
exports.getLivestockUse = getLivestockUse;


function isNumber(val){
  let regPos = /^[0-9]+.?[0-9]*/;
  return regPos.test(val);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*               Functions for getting Livestock Breeds data                */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getLivestockBreeds = (dataObj) => {
  //
  let livestock_name_1 = dataObj.livestock_name_1;
  let livestock_name_2 = dataObj.livestock_name_2;
  let livestock_name_3 = dataObj.livestock_name_3;
  let livestock_name_4 = dataObj.livestock_name_4;
  let livestock_name_5 = dataObj.livestock_name_5;


  //
  let livestock_1_breeds = dataObj.livestock_breeds_1;
  let livestock_2_breeds = dataObj.livestock_breeds_2;
  let livestock_3_breeds = dataObj.livestock_breeds_3;
  let livestock_4_breeds = dataObj.livestock_breeds_4;
  let livestock_5_breeds = dataObj.livestock_breeds_5;


  const livestockBreeds =  {
    livestock_1: [livestock_name_1, livestock_1_breeds],
    livestock_2: [livestock_name_2, livestock_2_breeds],
    livestock_3: [livestock_name_3, livestock_3_breeds],
    livestock_4: [livestock_name_4, livestock_4_breeds],
    livestock_5: [livestock_name_5, livestock_5_breeds],
  };

  let improvedBreeds = [];

  Object.values(livestockBreeds).filter(
    animal => (typeof(animal[0]) === "string") && (typeof(animal[1]) === "string")
  ).forEach(animal => {
    if (animal[1].includes("improved")) {
      improvedBreeds.push(animal[0]);
    }
  });

  return { api_breed_improved: improvedBreeds};
};
exports.getLivestockBreeds = getLivestockBreeds;