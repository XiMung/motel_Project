const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var appointmentShema = Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: { type: Date, required: true },
    status: { type: Number, required: true },
    created_at: { type: Date }
});


// userShema.plugin(uniqueValidator, { message: 'is already taken.' });
var appointmentModel = mongoose.model("appointment", appointmentShema);

module.exports = {
    appointmentModel: appointmentModel
}
