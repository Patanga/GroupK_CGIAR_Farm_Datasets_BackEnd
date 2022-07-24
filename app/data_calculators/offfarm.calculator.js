//off_farm1
exports.buildOfffarmIncome=(dataForAPIList)=>{
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

    for (var i in dataForAPIList) {

        var pro_string=dataForAPIList[i].api_off_farm_propotion
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
    //Number((xxx).toFixed(2))
    output['0%']=parseFloat(((percent_change.zero/count)*100).toFixed(2))
    output['10%']=parseFloat(((percent_change.little/count)*100).toFixed(2))
    output['20%']=parseFloat(((percent_change.underhalf/count)*100).toFixed(2))
    output['50%']=parseFloat(((percent_change.half/count)*100).toFixed(2))
    output['70%']=parseFloat(((percent_change.most/count)*100).toFixed(2))
    output['90%']=parseFloat(((percent_change.all/count)*100).toFixed(2))
    return {
        percentage:Object.keys(output),
        rate:Object.values(output)
    }

}

//off_farm2
exports.buildOfffarmMonth=(dataForAPIList)=>{
    var output={
        month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        count:[0,0,0,0,0,0,0,0,0,0,0,0]
    }
    var total=[]
    dataForAPIList.map(doc=>{
        total=total.concat(doc.api_off_farm_months)
    })
    var obj={}
    total.forEach(function(item){
        obj[item] = obj[item] ? obj[item]+1 : 1
    })
    output.count[0]=obj.jan
    output.count[1]=obj.feb
    output.count[2]=obj.mar
    output.count[3]=obj.apr
    output.count[4]=obj.may
    output.count[5]=obj.jun
    output.count[6]=obj.jul
    output.count[7]=obj.aug
    output.count[8]=obj.sep
    output.count[9]=obj.oct
    output.count[10]=obj.nov
    output.count[11]=obj.dec
    return output
}

//off_farm3
exports.buildOfffarmActivity=(dataForAPIList)=>{
    var output=[]
    dataForAPIList.map(doc=>{
        output=output.concat(doc.api_off_farm_activities)
    })
    var obj ={}
    output.forEach(function(item){
        obj[item] = obj[item] ? obj[item]+1 : 1
    })

    return {
        activity:Object.keys(obj),
        counts:Object.values(obj)
    }
}

//off_farm4
exports.buildOfffarmUsage=(dataForAPIList)=>{
    var output=[]
    dataForAPIList.map(doc=>{
        output=output.concat(doc.api_off_farm_spending)
    })
    var obj ={}
    output.forEach(function(item){
        obj[item] = obj[item] ? obj[item]+1 : 1
    })
    var keys = Object.keys(obj)
    var values = Object.values(obj)
    var final = []
    for(var i=0;i<keys.length;i++){
        var container = {value:values[i],name:keys[i]}
        final.push(container)
    }

    return final
}