//文件名没改，但是数据都是从indiacator中获取

const lodash = require('lodash')
const data = require("../models/data")
const selectKeys = [
    "id_unique",
    "id_country",
    "region",
    "id_proj",
    "id_form",
    "gps_lat",//个人
    "gps_lon",//个人
    
    "offfarm_income_proportion",//个人
    "offfarm_incomes",//个人
    "spending_off_farm_income",//个人
    "offfarm_month_1",//个人
    "offfarm_month_2",//个人
    "offfarm_month_3",//个人
    "offfarm_month_4",//个人
    "offfarm_month_5",//个人
    "offfarm_month_6",//个人
    "year",
    "hh_size_members",
    "hh_size_mae",
    "currency_conversion_lcu_to_ppp",
    "currency_conversion_factor_year",
    "crop_income_lcu_per_year",
    "livestock_income_lcu_per_year",
    "total_income_lcu_per_year",
    "off_farm_income_lcu_per_year",
    "value_crop_consumed_lcu_per_hh_per_year",
    "value_livestock_products_consumed_lcu_per_hh_per_year",
]

const stringKeys = [
    "id_unique",
    "id_form",
    "id_proj",
    "id_country",
    "region",
    "offfarm_income_proportion",
    "offfarm_incomes",
    "spending_off_farm_income",
    "offfarm_month_1",
    "offfarm_month_2",
    "offfarm_month_3",
    "offfarm_month_4",
    "offfarm_month_5",
    "offfarm_month_6",
]

// doc是单条记录，对于单条记录，遍历其properties（keys），如果property名称是在stringKeys数组里的
// 直接将该prop（key-value）加入parsedData，否则进行parseFloat转换为Number再存入
const parser = (doc, stringKeys) => {
    let parsedData = {}
    for (const prop in doc) {
        parsedData = stringKeys.includes(prop)
        ? { ...parsedData, [prop]: doc[prop] }
        : { ...parsedData, [prop]: parseFloat(doc[prop]) }
    }
    return parsedData
}

const getIndicatorData = async () => {
    // Query for all dataType:'indicator_data' in data
    // Noticed that some record has null in 'id_proj' , just skip those
    // var indicators = await data.find({ dataType: 'indicator_data', 'data.id_proj': { "$ne": null } })
    // 1. Fetch all indicator_data
    // const rawData = await data.find({ dataType: 'indicator_data', 'data.id_unique':'d44277b67994c4a52affdd855b07e6a6'}).limit(200)
    const rawData = await data.find({ dataType: 'processed_data'})
    // 2. Extract indicator_data.data
    const extData = rawData.map( e => e.data )
    // 3. Select needed fields
    const selectedData = extData.map( e => lodash.pick(e, selectKeys) )
    // 4. Parse numbers
    const parsedData = selectedData.map( e => parser(e, stringKeys))
    console.log(parsedData.length + ' records.')
    return parsedData
}

module.exports = getIndicatorData