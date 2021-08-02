var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var favouriteSchema = Schema({
    userId: { type: Schema.ObjectId, ref: "user" },
    districtId: { type: Schema.ObjectId, ref: "district" }
});

var favouriteModel = mongoose.model("favourite", favouriteSchema);
module.exports = {
    favouriteModel: favouriteModel
}