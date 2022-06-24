//frequency等价于count
// 传进来的数据形式在dataProcessor里面
// 建议把这个文件理解为独立出来的数据处理函数（帮data.controller.js做最后的数据规范统一）
exports.frequency = (DataForApiList) => { // 应该是传进来的数据
    let cattleAmount = 0;
    let sheepAmount = 0;
    let goatsAmount = 0;
    let pigsAmount = 0;
    let chickenAmount = 0;
    let otherPoultryAmount = 0;
    let rabbitsAmount = 0;
    let fishAmount = 0;
    let other_lstkAmount = 0;
    let other2_lstkAmount = 0;
    let other3_lstkAmount = 0;
    let donkeys_horsesAmount = 0;
    let beesAmount = 0;

    // 对传进来的数据进行统计 - 加和
    // 为啥加和出来之后是null呢？？ - 因为没有去掉na的数据
    DataForApiList.forEach(data => {
        if (isNumber(data.cattle)){
            cattleAmount += data.cattle;
        }
        if (isNumber(data.sheep)){
            sheepAmount += data.sheep;
        }
        if (isNumber(data.goats)){
            goatsAmount += data.goats;
        }
        if (isNumber(data.pigs)){
            pigsAmount += data.pigs;
        }
        if (isNumber(data.chicken)){
            chickenAmount += data.chicken;
        }
        if (isNumber(data.otherPoultry)){
            otherPoultryAmount += data.otherPoultry;
        }
        if (isNumber(data.rabbits)){
            rabbitsAmount += data.rabbits;
        }
        if (isNumber(data.fish)){
            fishAmount += data.fish;
        }
        if (isNumber(data.other_lstk)){
            other_lstkAmount += data.other_lstk;
        }
        if (isNumber(data.other2_lstk)){
            other2_lstkAmount += data.other2_lstk;
        }
        if (isNumber(data.other3_lstk)){
            other3_lstkAmount += data.other3_lstk;
        }
        if (isNumber(data.donkeys_horses)){
            donkeys_horsesAmount += data.donkeys_horses;
        }
        if (isNumber(data.bees)){
            beesAmount += data.bees;
        }
    })

    function isNumber(val){
        let regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。
        if(regPos.test(val) ){
            return true;
        }else{
            return false;
        }
    }

    // 最终需要的数据格式
    // ["<livestock specie>" : <int>]
    return [{
        "cattle" : cattleAmount,
        "sheep" : sheepAmount,
        "goats" : goatsAmount,
        "pigs" : pigsAmount,
        "chicken" : chickenAmount,
        "otherPoultry" : otherPoultryAmount,
        "rabbits" : rabbitsAmount,
        "fish" : fishAmount,
        "other_lstk" : other_lstkAmount,
        "other2_lstk" : other2_lstkAmount,
        "other3_lstk" : other3_lstkAmount,
        "donkeys_horses" : donkeys_horsesAmount,
        "bees" : beesAmount,
    }];
}