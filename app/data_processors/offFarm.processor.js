const {keysOfGroupingInProcessed, getSelectedRawData, getGroupingData,
  omitProperties} = require("./basic.processor.js");

const offfarm_month = [
  "offfarm_month_1",//个人
  "offfarm_month_2",//个人
  "offfarm_month_3",//个人
  "offfarm_month_4",//个人
  "offfarm_month_5",//个人
  "offfarm_month_6",//个人
];

let keysOfProcessed = [
  "offfarm_income_proportion",//个人
  "offfarm_incomes",//个人
  "spending_off_farm_income",//个人
];
keysOfProcessed = keysOfProcessed.concat(keysOfGroupingInProcessed, offfarm_month);

let keysOfIndicator = [
  "id_unique"
];


const keysOfSelect = {
  indicator: keysOfIndicator,
  processed: keysOfProcessed
};
exports.keysOfSelect = keysOfSelect; // export for test

let keysOfOmit = [
  "offfarm_incomes",
  "spending_off_farm_income",
];
keysOfOmit = keysOfOmit.concat(offfarm_month);
exports.keysOfOmit = keysOfOmit;


//
const combineAttributes = (selectedDataList) => {
  return selectedDataList.map(selectedDataObj => {
    let newObj = {};
    Object.assign( newObj, selectedDataObj, getGroupingData(selectedDataObj),
      getOffFarmMonth(selectedDataObj),getOffFarmActivity(selectedDataObj),
      getOffFarmSpendPie(selectedDataObj),
    );
    return omitProperties(newObj, keysOfOmit);
  });
};
exports.combineAttributes = combineAttributes;


exports.getDataForAPI = (indicatorDataList, processedDataList) => {
  const selectedDataList = getSelectedRawData(indicatorDataList, processedDataList,
    keysOfSelect);
  return combineAttributes(selectedDataList);
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting offfarm way of spend data                */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getOffFarmSpendPie = (dataObj) => {
  let pie= dataObj.spending_off_farm_income;
  let result=[]
  if(pie&&pie!="no_answer"&&pie!="null"){
    const str=pie.split(" ")
    for(var i=0;i<str.length;i++){
      result.push(str[i]);
    }
  }
  return { api_off_farm_spending: result };
};
exports.getOffFarmSpendPie = getOffFarmSpendPie;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting offfarm activities data                  */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getOffFarmActivity = (dataObj) => {
  let act= dataObj.offfarm_incomes;
  let result=[]
  if(act&&!act.includes("(")&&act!="no_answer"&&act!="null"){
    const acts=act.split(" ")
    for(var i=0;i<acts.length;i++){
      result.push(acts[i]);
    }
  }
  return { api_off_farm_activities: result };
};
exports.getOffFarmActivity = getOffFarmActivity;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/*           Functions for getting offfarm month data                       */
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const getOffFarmMonth = (dataObj) => {
  const rset=new Set();//做一个set，用于剔除重复的月份
  let m1= dataObj.offfarm_month_1;
  let m2= dataObj.offfarm_month_2;
  let m3= dataObj.offfarm_month_3;
  let m4= dataObj.offfarm_month_4;
  let m5= dataObj.offfarm_month_5;
  let m6= dataObj.offfarm_month_6;
  if(m1&&m1!="no_answer"){
    var sm1=m1.split(" ");
    for(var i=0;i<sm1.length;i++){
      rset.add(sm1[i]);
    }
  }
  if(m2&&m2!="no_answer"){
    var sm2=m2.split(" ");
    for(var i=0;i<sm2.length;i++){
      rset.add(sm2[i]);
    }
  }
  if(m3&&m3!="no_answer"){
    var sm3=m3.split(" ");
    for(var i=0;i<sm3.length;i++){
      rset.add(sm3[i]);
    }
  }
  if(m4&&m4!="no_answer"){
    var sm4=m4.split(" ");
    for(var i=0;i<sm4.length;i++){
      rset.add(sm4[i]);
    }
  }
  if(m5&&m5!="no_answer"){
    var sm5=m5.split(" ");
    for(var i=0;i<sm5.length;i++){
      rset.add(sm5[i]);
    }
  }
  if(m6&&m6!="no_answer"){
    var sm6=m6.split(" ");
    for(var i=0;i<sm6.length;i++){
      rset.add(sm6[i]);
    }
  }
  let result = [...rset];
  
  return { api_off_farm_months: result };
};
exports.getOffFarmMonth = getOffFarmMonth;