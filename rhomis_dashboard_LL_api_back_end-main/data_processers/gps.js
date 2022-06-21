const getData = require('./indicatorData')

const gps = async() =>{
    const data = await getData()

    const output = []
    for(var i in data){

        if(!data[i].gps_lat||!data[i].gps_lon){
            continue
        }

        const doc ={
            gpsLat : data[i].gps_lat,
            gpsLon : data[i].gps_lon,
        }
        output.push(doc)
    }

    return output
}

module.exports = gps;