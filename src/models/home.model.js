const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var homeShema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // address: { type: String, required: true },
    address: { type: Object },
    image: { type: Array },
    verify: { type: Number },
    min_price: { type: Number },
    min_area: { type: Number },
    point: { type: Number },
    reason: { type: String },
    lat: { type: Number },
    long: { type: Number },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    appointment: { type: Object }
}, {
    timestamps: true
});

var homeModel = mongoose.model("home", homeShema);

module.exports = {
    homeModel: homeModel
}
