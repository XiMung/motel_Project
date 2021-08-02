var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var citySchema = Schema({
    name: String
});

var cityModel = mongoose.model("city", citySchema);
module.exports = {
    cityModel: cityModel
}