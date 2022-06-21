const express = require("express");
const router = express.Router();
const getIndicatorData = require('../data_processers/indicatorData')
const {hisGram,pie,barChart,monGram} = require('../data_processers/livelihood.js')
const gps = require('../data_processers/gps')

router.get("/indicator_data", async (req, res) => {
    res.send(await getIndicatorData())
})

router.get("/livelihood/hisgram", async (req, res) => {
    res.send(await hisGram())
})
router.get("/livelihood/barChart", async (req, res) => {
    res.send(await barChart())
})
router.get("/livelihood/pie", async (req, res) => {
    res.send(await pie())
})
router.get("/livelihood/mongram", async (req, res) => {
    res.send(await monGram())
})
router.get("/gps", async (req, res) => {
    res.send(await gps())
})



module.exports = router;