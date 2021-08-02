const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var ratingShema = Schema({
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    point: { type: Number, required: true },
    Comment: { type: String }
});


// userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var ratingModel = mongoose.model("rating", ratingShema);

module.exports = {
    ratingModel: ratingModel
}
