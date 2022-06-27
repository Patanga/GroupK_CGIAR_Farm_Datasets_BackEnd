const getData = require('./indicatorData')
/*获取所有的比例数据，不转化为百分比
const hisGram = async () => {
    const data = await getData()
    const hisData = []

    for (var i in data) {

        var pro_string=data[i].offfarm_income_proportion
        if(pro_string&&!(pro_string=="no_answer")){//可以改成comntinue
        const doc = {
            id_unique: data[i].id_unique,
            total_income_from_off_farm: pro_string, 
        }
        hisData.push(doc)
        }
    }

    return hisData
}
*/


//农业之外收入所占百分比的比例条形图
const hisGram = async () => {
    const data = await getData()
    const percent_change = {
        all  : 0,
        most  : 0,
        half  : 0,
        underhalf  : 0,
        little  : 0,
        zero   : 0,
    }
    const output ={
        "0%"  : 0,
        "10%" : 0,
        "20%" : 0,
        "50%"  : 0,
        "70%"  : 0,
        "90%"  : 0,
    }

    for (var i in data) {

        var pro_string=data[i].offfarm_income_proportion
        if(pro_string==="no_answer"){
            continue
        }
        if(!pro_string){
            percent_change.zero++
        }
        //将string转化为百分比
        if(pro_string==="all"){
            percent_change.all++
        }
        if(pro_string==="most"){
            percent_change.most++
        }
        if(pro_string==="half"){
            percent_change.half++
        }
        if(pro_string==="underhalf"){
            percent_change.underhalf++
        }
        if(pro_string==="little"){
            percent_change.little++
        }
    }

    const count=percent_change.all+percent_change.half+percent_change.little+percent_change.most+percent_change.underhalf+percent_change.zero
    if(count===0){
        return output
    }
    output['0%']=(percent_change.zero/count)*100
    output['10%']=(percent_change.little/count)*100
    output['20%']=(percent_change.underhalf/count)*100
    output['50%']=(percent_change.half/count)*100
    output['70%']=(percent_change.most/count)*100
    output['90%']=(percent_change.all/count)*100
    //未对所需要的小数点后取几位进行计算
    var ne = Object.entries(output)
    return ne

}


//农业外收入的类型分布的饼图
/*
const pie=async ()=>{
    const data =await getData()
    const counter = {
        construction : 0,
        food : 0,
        prossessions: 0,
        invest_people : 0,
        invest_farm : 0,
        invest_house : 0,
        invest_nonfarm_business : 0,
        tax_debts : 0,
        saving : 0,
        other : 0,
        no_income : 0,
    }

    for(var i in data) {
        const all_str = data[i].spending_off_farm_income
        //如果为NA或no answer就不进入拆分
        if(!all_str || all_str==="no_answer"){
            continue
        }

        if(all_str.includes("construction")){
            counter.construction++
        }
        if(all_str.includes("food")){
            counter.food++
        }
        if(all_str.includes("invest_farm")){
            counter.invest_farm++
        }
        if(all_str.includes("invest_house")){
            counter.invest_house++
        }
        if(all_str.includes("invest_nonfarm_business")){
            counter.invest_nonfarm_business++
        }
        if(all_str.includes("invest_people")){
            counter.invest_people++
        }
        if(all_str.includes("no_income")){
            counter.no_income++
        }
        if(all_str.includes("other")){
            counter.other++
        }
        if(all_str.includes("prossessions")){
            counter.prossessions++
        }
        if(all_str.includes("saving")){
            counter.saving++
        }
        if(all_str.includes("tax_debts")){
            counter.tax_debts++
        }
    }

    const output=[
            {value : counter.construction , name : "construction"},
            {value : counter.food , name : "food"},
            {value : counter.invest_farm , name : "invest farm"},
            {value : counter.invest_house , name : "invest house"},
            {value : counter.invest_nonfarm_business , name : "invest nofarm business"},
            {value : counter.invest_people , name : "invest people"},
            {value : counter.no_income , name : "no income"},
            {value : counter.other , name : "other"},
            {value : counter.prossessions , name : "prossessions"},
            {value : counter.saving , name : "saving"},
            {value : counter.tax_debts , name : "tax debts"},
    ]

    return output

}
*/
//另一种算法，不过貌似和客户上次说的计算方法不太一样，但是结果是一样的，并且更为简洁，优先这个吧
const pie=async ()=>{
    const data =await getData()
    const output = []
    for(var i in data) {
        const all_str = data[i].spending_off_farm_income
        //如果为NA或no answer就不进入拆分
        if(!all_str || all_str==="no_answer"){
            continue
        }

        const str = all_str.split(" ")

        for(var j =0 ; j< str.length ; j++){
            output.push(str[j]);
        }
    }
    var obj ={}
    output.forEach(function(item){
        obj[item] = obj[item] ? obj[item]+1 : 1
    })
    
    var json = Object.entries(obj)
    var keys = Object.keys(obj)
    var values = Object.values(obj)
    var final = []
    for(var i=0;i<json.length;i++){
        var container = {value:values[i],name:keys[i]}
        final.push(container)
    }

    return final

}

const barChart = async() =>{
    const data = await getData()
    const output = []
    for(var i in data){
        const incomes = data[i].offfarm_incomes
        if(!incomes || incomes.includes("(") || incomes==="no_answer" || incomes==="null"){
            continue
        }

        const income = incomes.split(" ")

        for(var j =0 ; j< income.length ; j++){
            output.push(income[j]);
        }
    }

    var obj ={}
    output.forEach(function(item){
        obj[item] = obj[item] ? obj[item]+1 : 1
    })

    var ne = Object.entries(obj)
    return ne

}

//可能会用到的去重复的方法，后面好像没有用到。。
function unique(arr){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < arr.length; i++){
    	// 用indexOf方法判断元数组中的每个元素是否在新的临时数组中存在
        if(temp.indexOf(arr[i]) == -1){
        	// 不存在就存入临时数组中
            temp.push(arr[i]);
        }
    }
    return temp;
}

//非农业月份的数量统计,条形图
const monGram = async() =>{
    const data = await getData()

    const output =[]

    for(var i in data){

        if(!data[i].offfarm_month_1 || data[i].offfarm_month_1==="no_answer"){
            continue
        }else{
            var m1=data[i].offfarm_month_1.split(" ")
            for(var j=0 ; j<m1.length ; j++){
                output.push(m1[j]);
            }
        }

        if(!data[i].offfarm_month_2 || data[i].offfarm_month_2==="no_answer"){
            continue
        }else{
            var m2=data[i].offfarm_month_2.split(" ")
            for(var j=0 ; j<m2.length ; j++){
                output.push(m2[j]);
            }
        }

        if(!data[i].offfarm_month_3 || data[i].offfarm_month_3==="no_answer"){
            continue
        }else{
            var m3=data[i].offfarm_month_3.split(" ")
            for(var j=0 ; j<m3.length ; j++){
                output.push(m3[j]);
            }
        }

    }

    var obj ={}
    output.forEach(function(item){
        obj[item] = obj[item] ? obj[item]+1 : 1
    })

    var ne = Object.entries(obj)
    return ne

}

module.exports = { hisGram, pie, barChart, monGram}