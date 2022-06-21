const express = require("express");
const router = express.Router();
const getMetadata = require('../data_processers/metadata')

router.post("/", async (req, res) => {
    res.send(await getMetadata(req.query))
    // res.send(req.query)
})

module.exports = router;