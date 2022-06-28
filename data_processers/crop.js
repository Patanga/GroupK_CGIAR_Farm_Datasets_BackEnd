const { isNull } = require('lodash');
const getData = require('./processedData')
// const getMetadata = require('./metadata')

//箱型图，计算步骤：
//1.获取横坐标，即所有crop的name（crop_name_1(2345678)），用数组xName[]存放
//2.遍历xName[]，对于每一个元素，新建一个数组dataArray[]用来存放产量，
//遍历每一户，当这户人家种植了该种作物时，获取该户该作物的产量(crop_harvest_kg_per_year_1(2345678))并存放到dataArray[]中
//3.将计数，每一个xName的元素和对应的dataArray[] push到doc中
//4.boxData.push(doc);
const box_whisker = async () => {
    const data = await getData()
    var boxData = []
    var xName = [];//存储横坐标名字
    for(var i=0;i<data.length;i++){//遍历所有household 把所有cropname不重复地填充进去

        if(xName.indexOf(data[i].crop_name_1[0])<0){
            xName.push(data[i].crop_name_1[0]);
        }
        if(xName.indexOf(data[i].crop_name_2[0])<0){
            xName.push(data[i].crop_name_2[0]);
        }
        if(xName.indexOf(data[i].crop_name_3[0])<0){
            xName.push(data[i].crop_name_3[0]);
        }
        if(xName.indexOf(data[i].crop_name_4[0])<0){
            xName.push(data[i].crop_name_4[0]);
        }
        if(xName.indexOf(data[i].crop_name_5[0])<0){
            xName.push(data[i].crop_name_5[0]);
        }
        if(xName.indexOf(data[i].crop_name_6[0])<0){
            xName.push(data[i].crop_name_6[0]);
        }
        if(xName.indexOf(data[i].crop_name_7[0])<0){
            xName.push(data[i].crop_name_7[0]);
        }
        if(xName.indexOf(data[i].crop_name_8[0])<0){
            xName.push(data[i].crop_name_8[0]);
        }
    }
    for(var i=0;i<xName.length;i++){//对于每一个crop
        const name = xName[i];//获取本次循环的cropname
        var dataArray = [];//新建数组存储该crop的产量
        for(var j in data){//遍历每一户，若种植的八种crop中有该crop，且产量为有效数字，则将该产量数字push到dataArray[]中
            if(data[j].crop_name_1[0]==name&&Number.isFinite(data[j].crop_name_1[1])){
                dataArray.push(data[j].crop_name_1[1]);
            }
            if(data[j].crop_name_2[0]==name&&Number.isFinite(data[j].crop_name_2[1])){
                dataArray.push(data[j].crop_name_2[1]);
            }
            if(data[j].crop_name_3[0]==name&&Number.isFinite(data[j].crop_name_3[1])){
                dataArray.push(data[j].crop_name_3[1]);
            }
            if(data[j].crop_name_4[0]==name&&Number.isFinite(data[j].crop_name_4[1])){
                dataArray.push(data[j].crop_name_4[1]);
            }
            if(data[j].crop_name_5[0]==name&&Number.isFinite(data[j].crop_name_5[1])){
                dataArray.push(data[j].crop_name_5[1]);
            }
            if(data[j].crop_name_6[0]==name&&Number.isFinite(data[j].crop_name_6[1])){
                dataArray.push(data[j].crop_name_6[1]);
            }
            if(data[j].crop_name_7[0]==name&&Number.isFinite(data[j].crop_name_7[1])){
                dataArray.push(data[j].crop_name_7[1]);
            }
            if(data[j].crop_name_8[0]==name&&Number.isFinite(data[j].crop_name_8[1])){
                dataArray.push(data[j].crop_name_8[1]);
            }
        }
        const doc = {
            count: i,//计数
            cropName: xName[i],//横轴名字
            data_array: dataArray,//纵轴数据 
        }
        boxData.push(doc);
    }
    return boxData;
}

//条形图
//计算步骤：
//1.获取每一个household的crops_all，并对其进行按照空格分割为若干个字符串，将这些字符串全部push到arr中；
//2.去重：去除arr中重复的字符串，得到横坐标
//3.新建一个数组count_of_households用来存储种植每种crop的家庭数量
//4.对于每一个横坐标字符串，遍历所有household的crops_all字段，如果字段包含该字符串，则对应的count_of_households数组元素+1
//5.将cropName和对应的count push到doc中
//6.将doc push到bardata中
const bar = async () => {
    const data = await getData()
    const barData = []
    //定义一个数组
    var arr = new Array();
    for(var i=0;i<data.length;i++){//获取每一个household的crops_all，并对其进行按照空格分割为若干个字符串，将这些字符串全部push到arr中；
        if(isNull(data[i].crops_all)){
            continue
        }
        const i_nums = data[i].crops_all.trim().split(/\s+/).length;
        for(var j=0;j<i_nums;j++){
            arr.push(data[i].crops_all.trim().split(/\s+/)[j]);
        }
    }
    var empty = [];//声明一个空数组
    for(var n=0;n<arr.length;n++){//循环arr中元素
        //判断empty数组中是否有arr数组中的第n个元素，小于0就是没有
        //if 没有，把此元素添加到empty中
        if(empty.indexOf(arr[n])<0){
            empty.push(arr[n]);//push()用来向数组的末尾添加元素
        }

    }
    arr = empty;//这里得到没有重复的约上百种种crop ，即横坐标文字
    var count_of_households = new Array(arr.length);//新建一个数组存储arr每个元素对应的数据
    for(var j=0;j<count_of_households.length;j++){//数组元素初始化为0
        count_of_households[j]=0;
    }
    for(var j=0;j<arr.length;j++){//对于每一个横坐标字符串，遍历所有household的crops_all字段，如果字段包含该字符串，则对应的count_of_households数组元素+1
        var crop_name = arr[j];
        for(var k=0;k<data.length;k++){
            if(isNull(data[k].crops_all)){
                continue
            }
            if(data[k].crops_all.indexOf(crop_name)!=-1){
                count_of_households[j]++;
            }
        }
    }
    for(var l=0;l<arr.length;l++){
        const doc = {
            cropName: arr[l],//横坐标
            count: count_of_households[l],//纵坐标
        }
        barData.push(doc)
    }
    return barData
}

//histogram:
//1.对于每个household，读取landcultivated列，并忽略NA和负数数据
//2.push到histogrData里
const histogram = async () => {
    const data = await getData()
    const histogramData = []
    var x = [];
    for(var i in data){
        //check value
        var i_landcultivated = data[i].landcultivated
        if(!Number.isFinite(i_landcultivated)||i_landcultivated<0){
            continue
        }
        histogramData.push(i_landcultivated)
    }
    return histogramData
}

//grouped条形图：
//1.遍历所有household的8个consumed和8个sold数据，并将非数字数据赋值为0
//2.8个consumed数据相加除以8算平均数，sold同理，并和id_unique一起push到doc里
//3.doc push到bardata里。
const groupedBar = async () => {
    const data = await getData()
    const barData = []
    for(var i in data){
        const doc = {
            id_unique: data[i].id_unique,//横轴
            crop_consumed_avg_kg: data[i].crop_consumed_kg_per_year_1,//纵轴数据1
            crop_sold_avg_kg: data[i].crop_sold_kg_per_year_1,//纵轴数据2
        }
        barData.push(doc)
    }
    return barData
}

module.exports = {groupedBar,histogram,bar,box_whisker}






















// //histogram：（0.5公顷为一个区间版本）
// //1.建立一个数组x,容量为340000（因为数据最大值为165000，四舍五入算170000，然后0.5为一个区间，即170000*2=340000）
// //2.对于每一个household，用landcultivated列的数据除以0.5，把结果向上取整，得到该household的耕地面积在横坐标的哪个区间（比如1.2/0.5=2.4,则在第三个区间，即1-1.5）
// //3.然后x[第几个区间]++,
// //4.总共7160个household，所以 (每一个区间的耕地数量/7160)*100 为纵坐标数值 
// const histogram = async () => {
//     const data = await getData()
//     const histogramData = []
//     //横坐标数据0-170000，每0.5为一个区间
//     //定义一个数组，长度为2*170000=340000
//     var x = new Array(340000);
//     for(var j=0;j<340000;j++){
//         x[j]=0;
//     }
//     for(var i in data){
//         //check value
//         var i_landcultivated = data[i].landcultivated
//         if(!Number.isFinite(i_landcultivated)||i_landcultivated<0){
//             i_landcultivated=0;
//         }
//         const i_location = parseInt(i_landcultivated/0.5);
//         x[i_location]++;
//     }
//     for(var k=0;k<x.length;k++){
//         const doc = {
//             location: k,
//             percentage_of_hh: (x[k]/7160)*100,
//         }
//         histogramData.push(doc)
//     }
    
//     return histogramData
// }
