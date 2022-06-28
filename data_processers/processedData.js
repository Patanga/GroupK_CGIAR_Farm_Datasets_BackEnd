const { isNull } = require('lodash')
const lodash = require('lodash')
const data = require("../models/data")
const selectedKeys = [
    "id_unique",
    "id_country",
    "region",
    "id_form",
    "id_proj",
    "landcultivated",
    "crops_all",
    "crop_consumed_kg_per_year_1",
    "crop_consumed_kg_per_year_2",
    "crop_consumed_kg_per_year_3",
    "crop_consumed_kg_per_year_4",
    "crop_consumed_kg_per_year_5",
    "crop_consumed_kg_per_year_6",
    "crop_consumed_kg_per_year_7",
    "crop_consumed_kg_per_year_8",
    "crop_sold_kg_per_year_1",
    "crop_sold_kg_per_year_2",
    "crop_sold_kg_per_year_3",
    "crop_sold_kg_per_year_4",
    "crop_sold_kg_per_year_5",
    "crop_sold_kg_per_year_6",
    "crop_sold_kg_per_year_7",
    "crop_sold_kg_per_year_8",
    "crop_name_1",
    "crop_name_2",
    "crop_name_3",
    "crop_name_4",
    "crop_name_5",
    "crop_name_6",
    "crop_name_7",
    "crop_name_8",
    "crop_harvest_kg_per_year_1",
    "crop_harvest_kg_per_year_2",
    "crop_harvest_kg_per_year_3",
    "crop_harvest_kg_per_year_4",
    "crop_harvest_kg_per_year_5",
    "crop_harvest_kg_per_year_6",
    "crop_harvest_kg_per_year_7",
    "crop_harvest_kg_per_year_8",
]

var selectedKeys1 = [
    "id_unique",
    "id_country",
    "region",
    "id_form",
    "id_proj",
    "landcultivated",
    "crops_all",
    "crop_consumed_kg_per_year_1",
    "crop_sold_kg_per_year_1",
    "crop_name_1",
    "crop_name_2",
    "crop_name_3",
    "crop_name_4",
    "crop_name_5",
    "crop_name_6",
    "crop_name_7",
    "crop_name_8",
]

const stringKeys = [
    "id_unique",
    "id_country",
    "id_region",
    "id_form",
    "id_proj",
    "crops_all",
    "crop_name_1",
    "crop_name_2",
    "crop_name_3",
    "crop_name_4",
    "crop_name_5",
    "crop_name_6",
    "crop_name_7",
    "crop_name_8",
]

const parser = (doc, stringKeys) => {
    let parsedData = {}
    for (const prop in doc) {
        parsedData = stringKeys.includes(prop)
        ? { ...parsedData, [prop]: doc[prop] }
        : { ...parsedData, [prop]: parseFloat(doc[prop]) }
    }
    return parsedData
}

const getProcessedData = async () => {
    const rawData = await data.find({dataType: 'processed_data'})
    const extData = rawData.map(e => e.data)
    const selectedData = extData.map(e => lodash.pick(e,selectedKeys))
    const parsedData = selectedData.map(e=>parser(e,stringKeys))

    for(var i in parsedData){
       //简化groupedbar数据，Does it need illegal value like null check here?
       //NA全部换成0
       //consumed
       var i_consumed1 = parsedData[i].crop_consumed_kg_per_year_1
       var i_consumed2 = parsedData[i].crop_consumed_kg_per_year_2
       var i_consumed3 = parsedData[i].crop_consumed_kg_per_year_3
       var i_consumed4 = parsedData[i].crop_consumed_kg_per_year_4
       var i_consumed5 = parsedData[i].crop_consumed_kg_per_year_5
       var i_consumed6 = parsedData[i].crop_consumed_kg_per_year_6
       var i_consumed7 = parsedData[i].crop_consumed_kg_per_year_7
       var i_consumed8 = parsedData[i].crop_consumed_kg_per_year_8
       //sold
       var i_sold1 = parsedData[i].crop_sold_kg_per_year_1
       var i_sold2 = parsedData[i].crop_sold_kg_per_year_2
       var i_sold3 = parsedData[i].crop_sold_kg_per_year_3
       var i_sold4 = parsedData[i].crop_sold_kg_per_year_4
       var i_sold5 = parsedData[i].crop_sold_kg_per_year_5
       var i_sold6 = parsedData[i].crop_sold_kg_per_year_6
       var i_sold7 = parsedData[i].crop_sold_kg_per_year_7
       var i_sold8 = parsedData[i].crop_sold_kg_per_year_8
       if(!Number.isFinite(i_consumed1)){
           i_consumed1=0;
       }
       if(!Number.isFinite(i_consumed2)){
           i_consumed2=0;
       }
       if(!Number.isFinite(i_consumed3)){
           i_consumed3=0;
       }
       if(!Number.isFinite(i_consumed4)){
           i_consumed4=0;
       }
       if(!Number.isFinite(i_consumed5)){
           i_consumed5=0;
       }
       if(!Number.isFinite(i_consumed6)){
           i_consumed6=0;
       }
       if(!Number.isFinite(i_consumed7)){
           i_consumed7=0;
       }
       if(!Number.isFinite(i_consumed8)){
           i_consumed8=0;
       }

       if(!Number.isFinite(i_sold1)){
           i_sold1=0;
       }
       if(!Number.isFinite(i_sold2)){
           i_sold2=0;
       }
       if(!Number.isFinite(i_sold3)){
           i_sold3=0;
       }
       if(!Number.isFinite(i_sold4)){
           i_sold4=0;
       }
       if(!Number.isFinite(i_sold5)){
           i_sold5=0;
       }
       if(!Number.isFinite(i_sold6)){
           i_sold6=0;
       }
       if(!Number.isFinite(i_sold7)){
           i_sold7=0;
       }
       if(!Number.isFinite(i_sold8)){
           i_sold8=0;
       }
       //合并消费12345678的平均数到消费1，合并销售12345678的平均数到销售1
       parsedData[i].crop_consumed_kg_per_year_1 = (i_consumed1+i_consumed2+i_consumed3+i_consumed4+i_consumed5+i_consumed6+i_consumed7+i_consumed8)/8;
       parsedData[i].crop_sold_kg_per_year_1 = (i_sold1+i_sold2+i_sold3+i_sold4+i_sold5+i_sold6+i_sold7+i_sold8)/8


       //简化箱型图数据
       var i_name1 = parsedData[i].crop_name_1;
       var i_name2 = parsedData[i].crop_name_2;
       var i_name3 = parsedData[i].crop_name_3;
       var i_name4 = parsedData[i].crop_name_4;
       var i_name5 = parsedData[i].crop_name_5;
       var i_name6 = parsedData[i].crop_name_6;
       var i_name7 = parsedData[i].crop_name_7;
       var i_name8 = parsedData[i].crop_name_8;
       var i_harvest1 = parsedData[i].crop_harvest_kg_per_year_1;
       var i_harvest2 = parsedData[i].crop_harvest_kg_per_year_2;
       var i_harvest3 = parsedData[i].crop_harvest_kg_per_year_3;
       var i_harvest4 = parsedData[i].crop_harvest_kg_per_year_4;
       var i_harvest5 = parsedData[i].crop_harvest_kg_per_year_5;
       var i_harvest6 = parsedData[i].crop_harvest_kg_per_year_6;
       var i_harvest7 = parsedData[i].crop_harvest_kg_per_year_7;
       var i_harvest8 = parsedData[i].crop_harvest_kg_per_year_8;
       parsedData[i].crop_name_1 =[
        i_name1,
        i_harvest1,
       ];
       parsedData[i].crop_name_2 =[
        i_name2,
        i_harvest2,
       ];
       parsedData[i].crop_name_3 =[
        i_name3,
        i_harvest3,
       ];
       parsedData[i].crop_name_4 =[
        i_name4,
        i_harvest4,
       ];
       parsedData[i].crop_name_5 =[
        i_name5,
        i_harvest5,
       ];
       parsedData[i].crop_name_6 =[
        i_name6,
        i_harvest6,
       ];
       parsedData[i].crop_name_7 =[
        i_name7,
        i_harvest7,
       ];
       parsedData[i].crop_name_8 =[
        i_name8,
        i_harvest8,
       ];
   }
   const selectedData1 = parsedData.map(e => lodash.pick(e,selectedKeys1))
    console.log(selectedData1.length + 'records.')
    return selectedData1
}

module.exports = getProcessedData