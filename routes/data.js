const express = require("express");
const router = express.Router();
const getProcessedData = require('../data_processers/processedData')
const {groupedBar,histogram,bar,box_whisker} = require('../data_processers/crop.js')

router.get("/processed_data", async (req,res) => {
    res.send(await getProcessedData())
})

//consumed and sold
router.get("/crop/grouped_bar", async(req, res) => {
    res.send(await groupedBar())
})
//land
router.get("/crop/histogram", async(req, res) => {
    res.send(await histogram())
})
//cropsGrown
router.get("/crop/bar", async(req, res) => {
    res.send(await bar())
})
//box_whisker
router.get("/crop/box_whisker", async(req, res) => {
    res.send(await box_whisker())
})


module.exports = router;