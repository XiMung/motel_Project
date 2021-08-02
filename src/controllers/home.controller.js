var { homeModel } = require("../models/home.model");
var queryParser = require('../configs/queryParser');
const tv4 = require('tv4');
const HomeSchema = require('../schemas/Home.schema.json');

module.exports = {
    create: create,
    get: get
}

async function create(req, res) {
    try {
        var body = req.body;
        // var schema = tv4.validateResult(body, HomeSchema, true, true);
        // if (!schema.valid) {
        //     return res.status(400).json({ error: `${schema.error.dataPath}: ${schema.error.message}` });
        // }
        if (!body.title) return res.json({ error: true, message: "title empty" });
        if (!body.description) return res.json({ error: true, message: "description empty" });
        if (!body.address) return res.json({ error: true, message: "address empty" });

        var image = req.files;
        if (image == 0) return res.json({ error: true, message: "image empty" });
        var A = [];
        for (let i = 0; i < image.length; i++) {
            A[i] = image[i].filename;
        }

        if (!body.min_prince) return res.json({ error: true, message: "min_prince empty" });
        if (!body.min_area) return res.json({ error: true, message: "min_area empty" });
        if (!body.userId) return res.json({ error: true, message: "userId empty" });
        if (!body.wardId) return res.json({ error: true, message: "wardId empty" });
        var query = {
            title: body.title,
            description: body.description,
            address: body.address,
            image: A,
            verify: 0,
            min_prince: body.min_prince,
            min_area: body.min_area,
            point: body.point,
            reason: body.reason,
            lat: body.lat,
            long: body.long,
            userId: body.userId,
            wardId: body.wardId,
            created_at: new Date(),
            updated_at: new Date()
        }

        var home = new homeModel(query);
        var data = await home.save();
        return res.json({ error: false, data: data });
    } catch (error) {
        return res.json({ error: true, message: error });
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


        var homeQuery = homeModel
            .find(queryOptions.$filter)
            .select(queryOptions.$select)
            .limit(queryOptions.$top)
            .skip(queryOptions.$skip)
            .sort(queryOptions.$sort)

        homeQuery = await homeQuery.exec();
        var homes = JSON.parse(JSON.stringify(homeQuery));

        return res.json({ error: false, data: homes });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
}