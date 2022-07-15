//gps part
exports.buildHomeMap=(dataForAPIList)=>{
    const output=[]
    dataForAPIList.map(doc=>{
        output.push(doc.api_gps);
    })
    return output
}