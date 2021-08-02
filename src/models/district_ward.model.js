var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var district_ward = Schema({
    wardId: { type: Schema.ObjectId, ref: "ward" },
    districtId: { type: Schema.ObjectId, ref: "district" }
});

var district_wardModel = mongoose.model("district_ward", district_ward);
module.exports = {
    district_wardModel: district_wardModel
}