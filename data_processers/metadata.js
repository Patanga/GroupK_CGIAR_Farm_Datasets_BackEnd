const metadata = require('../models/metadata')
const getMetadata = async (params) => {
    // console.log(params+'in getmetadata()')
    // console.log(JSON.stringify(params))
    const metadataList = await metadata.find(params)
    return metadataList
}

module.exports = getMetadata