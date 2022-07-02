let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let projectDataSchema = new Schema(
    {formID: String,
    projectID: String,
    units: Array,
    dataSets: Array}, 
    {collection: "projectData"}
);

projectDataSchema.method("toJSON", function() {
    const {_id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("projectData", projectDataSchema);