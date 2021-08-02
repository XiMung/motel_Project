const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var homeShema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: Array },
    verify: { type: Number },
    min_prince: { type: Number },
    min_area: { type: Number },
    point: { type: Number },
    reason: { type: String },
    lat: { type: Number },
    long: { type: Number },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    wardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ward"
    },
    created_at: { type: Date },
    updated_at: { type: Date }
});

var homeModel = mongoose.model("home", homeShema);

module.exports = {
    homeModel: homeModel
}
