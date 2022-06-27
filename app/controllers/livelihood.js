const numKeys = [
    "year",
    "hh_size_members",
    "hh_size_mae",
    "currency_conversion_lcu_to_ppp",
    "crop_income_lcu_per_year",
    "livestock_income_lcu_per_year",
    "total_income_lcu_per_year",
    "off_farm_income_lcu_per_year",
    "value_crop_consumed_lcu_per_hh_per_year",
    "value_livestock_products_consumed_lcu_per_hh_per_year",
]

const parseData = (doc, numKeys) => {
    let parsedData = {}
    for (var prop in doc) {
        parsedData = numKeys.includes(prop)
            ? { ...parsedData, [prop]: parseFloat(doc[prop]) }
            : { ...parsedData, [prop]: doc[prop] }
    }
    return parsedData
}

/**
 * Calculate TVA
 * Returns a new object that contains converted ppp value of income
 * And a Key "tva_ppp_per_mae_per_d" for tva
 */
const calAppendTVA = (doc) => {
    // Does it need illegal value like null check here?
    const year = doc.year
    const days = (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 366 : 365
    const mae = doc.hh_size_mae
    const rate = doc.currency_conversion_lcu_to_ppp

    // Validation of essential value for calculate TVA
    if (!year || !days || !mae || !rate) {
        //console.log('Invalid record, id_uique: ' + doc.id_unique)
        //console.log('year: ' + year + ' mae:' + mae + ' rate: ' + rate)
        return null
    }

    // for (prop in doc) {
    //     if(prop === 'id_unique') continue
    //     console.log('prop:' + prop)
    //     console.log('doc[prop]' + doc[prop])
    //     if (isNaN(doc[prop]) || doc[prop] === null) doc[prop] = 0
    // }
    // Value for currency convertion
    const i_crop = doc.crop_income_lcu_per_year ? doc.crop_income_lcu_per_year : 0
    const i_lstk = doc.livestock_income_lcu_per_year ? doc.livestock_income_lcu_per_year : 0
    const i_o_f = doc.off_farm_income_lcu_per_year ? doc.off_farm_income_lcu_per_year : 0
    const c_crop = doc.value_crop_consumed_lcu_per_hh_per_year ? doc.value_crop_consumed_lcu_per_hh_per_year : 0
    const c_lstk = doc.value_livestock_products_consumed_lcu_per_hh_per_year ? doc.value_livestock_products_consumed_lcu_per_hh_per_year : 0

    // Currency convertion
    const con = {
        id_unique: doc.id_unique,
        income_crop_ppp_per_mae_per_d: i_crop / rate / mae / days,
        income_lstk_ppp_per_mae_per_d: i_lstk / rate / mae / days,
        income_off_farm_ppp_per_mae_per_d: i_o_f / rate / mae / days,
        consumed_crop_ppp_per_mae_per_d: c_crop / rate / mae / days,
        consumed_lstk_ppp_per_mae_per_d: c_lstk / rate / mae / days,
    }

    // Calculate TVA (total value of activities) for this record
    // ** Using per MAE here not per person
    con.tva_ppp_per_mae_per_d =
        con.income_crop_ppp_per_mae_per_d
        + con.income_lstk_ppp_per_mae_per_d
        + con.income_off_farm_ppp_per_mae_per_d
        + con.consumed_crop_ppp_per_mae_per_d
        + con.consumed_lstk_ppp_per_mae_per_d
    return con
}

// Total value of activities
exports.buildTVA = (dataForAPIList) => {
    // parse numbers
    let parsedData = dataForAPIList.map(doc => parseData(doc, numKeys))
    // bar data are return value from calTVA
    let barData = []
    for (var i in parsedData) {
        let res = calAppendTVA(parsedData[i])
        if (!res) {
            continue
        }
        barData.push(res)
    }
    return barData
}

exports.buildIncomeCat = (dataForAPIList) => {
    // parse numbers
    let parsedData = dataForAPIList.map(doc => parseData(doc, numKeys))
    // pie data are counters for total_income_ppp_per_mae_per_d
    let pieCntData = {
        under_1_usd_cnt: 0,
        _1to1_9_cnt: 0,
        above_1_9_cnt: 0,
    }
    for (var j in parsedData) {
        const year = parsedData[j].year
        const days = (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 366 : 365
        const mae = parsedData[j].hh_size_mae
        const rate = parsedData[j].currency_conversion_lcu_to_ppp
        // Does it need illegal value like null check here?
        if (!year || !days || !mae || !rate) {
            console.log('Invalid record for LL pie, id_uique: ' + parsedData[j].id_unique)
            console.log('year: ' + year + ' mae:' + mae + ' rate: ' + rate)
            continue
        }
        const doc = {
            id_unique: parsedData[j].id_unique,
            total_income_ppp_per_mae_per_d: parsedData[j].total_income_lcu_per_year / rate / mae / days,
        }
        if (doc.total_income_ppp_per_mae_per_d < 1) {
            pieCntData.under_1_usd_cnt++
        }
        else if (doc.total_income_ppp_per_mae_per_d > 1.9) {
            pieCntData.above_1_9_cnt++
        }
        else {
            pieCntData._1to1_9_cnt++
        }
    }
    // format data for echarts
    const pieData = [
        { value: pieCntData.under_1_usd_cnt, name: '< 1 USD' },
        { value: pieCntData._1to1_9_cnt, name: '1 to 1.99 USD' },
        { value: pieCntData.above_1_9_cnt, name: '> 1.99 USD' },
    ]
    return pieData
}

exports.buildAnnualValue = (dataForAPIList) => {
    // parse numbers
    let parsedData = dataForAPIList.map(doc => parseData(doc, numKeys))
    // Box and Whisker plot
    const boxData = {
        income_crop_ppp_per_mae: [],
        income_lstk_ppp_per_mae: [],
        income_off_farm_ppp_per_mae: [],
        consumed_crop_ppp_per_mae: [],
        consumed_lstk_ppp_per_mae: [],
    }
    for (var k in parsedData) {
        // Does it need illegal value like null check here?
        const mae = parsedData[k].hh_size_mae
        const rate = parsedData[k].currency_conversion_lcu_to_ppp
        if (!mae || !rate) {
            console.log('Invalid record for LL box whisker, id_uique: ' + parsedData[k].id_unique)
            console.log(' mae:' + mae + ' rate: ' + rate)
            continue
        }
        boxData.income_crop_ppp_per_mae.push(parsedData[k].crop_income_lcu_per_year / rate / mae)
        boxData.income_lstk_ppp_per_mae.push(parsedData[k].livestock_income_lcu_per_year / rate / mae)
        boxData.income_off_farm_ppp_per_mae.push(parsedData[k].off_farm_income_lcu_per_year / rate / mae)
        boxData.consumed_crop_ppp_per_mae.push(parsedData[k].value_crop_consumed_lcu_per_hh_per_year / rate / mae)
        boxData.consumed_lstk_ppp_per_mae.push(parsedData[k].value_livestock_products_consumed_lcu_per_hh_per_year / rate / mae)
    }
    return boxData
}
