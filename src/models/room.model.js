const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var roomShema = Schema({
    price: { type: Number, required: true },
    deposit: { type: Number, required: true },
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home"
    },
    maximum: { type: Number, required: true },
    area: { type: Number, require: true },
    image: { type: Array, require: true },
    description: { type: String, require: true },
    status: { type: Number, require: true }
}, {
    timestamps: true
});


// userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var roomModel = mongoose.model("room", roomShema);

module.exports = {
    roomModel: roomModel
}
