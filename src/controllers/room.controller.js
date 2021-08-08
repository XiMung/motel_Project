var { roomModel } = require("../models/room.model");
var { homeModel } = require("../models/home.model");
var queryParser = require('../configs/queryParser');
const tv4 = require('tv4');
const RoomSchema = require('../schemas/Room.shcema.json');

module.exports = {
    create: create,
    get: get
}

async function create(req, res) {
    try {
        var body = req.body;
        // var schema = tv4.validateResult(body, RoomSchema, true, true);
        // if (!schema.valid) {
        //     return res.status(400).json({ error: `${schema.error.dataPath}: ${schema.error.message}` });
        // }
        if (!body.price) return res.json({ error: true, message: "Price empty" });
        if (!body.description) return res.json({ error: true, message: "Description empty" });
        if (!body.deposit) return res.json({ error: true, message: "Deposit empty" });

        var image = req.files;
        if (image == 0) return res.json({ error: true, message: "Image empty" });
        var A = [];
        for (let i = 0; i < image.length; i++) {
            A[i] = image[i].filename;
        }

        if (!body.maximum) return res.json({ error: true, message: "Maximum empty" });
        if (!body.area) return res.json({ error: true, message: "Area empty" });
        // if (!body.status) return res.json({ error: true, message: "Status empty" });
        if (!body.homeId) return res.json({ error: true, message: "HomeId empty" });
        var checkHome = await homeModel.findById(body.homeId);
        if (!checkHome) return res.json({ error: true, message: "HomeId not exist" });
        var query = {
            price: body.price,
            description: body.description,
            deposit: body.deposit,
            image: A,
            maximum: body.maximum,
            area: body.area,
            status: 1,
            homeId: body.homeId
        }

        var room = new roomModel(query);
        var data = await room.save();
        await Min_priceAndMin_area(body.homeId);
        return res.json({ error: false, data: data });
    } catch (error) {
        return res.json({ error: true, message: error.message });
    }
}

async function get(req, res) {
    try {
        var queryOptions = queryParser(req);
        console.log(queryOptions);
        if (queryOptions.error) {
            return res.status(400).send(queryOptions.error);
        }
        queryOptions.$filter = queryOptions.$filter || {};
        if (!queryOptions.$select) queryOptions.$select = {};
        if (!queryOptions.$top) queryOptions.$top = 20;
        if (!queryOptions.$skip) queryOptions.$skip = 0;
        if (!queryOptions.$sort) queryOptions.$sort = { _id: 1 };


        var roomQuery = roomModel
            .find(queryOptions.$filter)
            .select(queryOptions.$select)
            .limit(queryOptions.$top)
            .skip(queryOptions.$skip)
            .sort(queryOptions.$sort)

        roomQuery = await roomQuery.exec();
        var rooms = JSON.parse(JSON.stringify(roomQuery));

        return res.json({ error: false, data: rooms });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
}

async function Min_priceAndMin_area(homeId) {
    try {
        var price = await roomModel.find({ homeId: homeId }).sort({ price: 1 }).select('price');
        console.log(JSON.stringify(price));
        if (!price) {
            price = null;
        } else {
            price = price[0].price;
        }

        var area = await roomModel.find({ homeId: homeId }).sort({ area: 1 }).select('area');
        if (!area) {
            area = null;
        } else {
            area = area[0].area;
        }

        await homeModel.updateOne({ _id: homeId }, { min_price: price, min_area: area })
    } catch (error) {
        return res.json({ error: true, message: error.message });
    }

}