const lodash = require('lodash')
const data = require("../models/data")
const selectedKeys = [
    "id_unique",
    "id_hh",
    "id_rhomis_dataset",
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
const stringKeys = [
    "id_unique",
    "id_hh",
    "id_rhomis_dataset",
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
    console.log(parsedData.length + 'records.')
    return parsedData
}

module.exports = getProcessedData