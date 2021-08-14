var { homeModel } = require("../models/home.model");
var queryParser = require('../configs/queryParser');
const tv4 = require('tv4');
const HomeSchema = require('../schemas/Home.schema.json');

module.exports = {
    create: create,
    get: get
}
var query = {};

async function create(req, res) {
    try {
        var body = req.body;
        // var schema = tv4.validateResult(body, HomeSchema, true, true);
        // if (!schema.valid) {
        //     return res.status(400).json({ error: `${schema.error.dataPath}: ${schema.error.message}` });
        // }
        if (!body.title) return res.json({ error: true, message: "Title empty" });
        if (!body.description) return res.json({ error: true, message: "Description empty" });
        if (!body.address) return res.json({ error: true, message: "Address empty" });

        // var image = req.files;
        // if (!image || image.length == 0) return res.json({ error: true, message: "Image empty" });
        // var A = [];
        // for (let i = 0; i < image.length; i++) {
        //     A[i] = image[i].filename;
        // }

        if (!body.userId) return res.json({ error: true, message: "userId empty" });
        var query = {
            title: body.title,
            description: body.description,
            address: body.address,
            // image: A,
            image: "",
            verify: 0,
            point: 0,
            reason: "",
            lat: body.lat,
            long: body.long,
            userId: body.userId
        }

        var home = new homeModel(query);
        var data = await home.save();
        return res.json({ error: false, data: data });
    } catch (error) {
        return res.json({ error: true, message: error.message });
    }
}

async function get(req, res) {
    try {
        var queryOptions = queryParser(req);
        if (queryOptions.error) {
            return res.status(400).send(queryOptions.error);
        }
        queryOptions.$filter = queryOptions.$filter || {};
        if (!queryOptions.$select) queryOptions.$select = {};
        if (!queryOptions.$top) queryOptions.$top = 20;
        if (!queryOptions.$skip) queryOptions.$skip = 0;
        if (!queryOptions.$sort) queryOptions.$sort = { _id: 1 };

        //check address
        var obj = await queryDispatcher(queryOptions.$filter)
        //

        if (Object.keys(obj).length !== 0) {
            queryOptions.$filter = obj;
        }

        query = {};
        var homeQuery = homeModel
            .find(queryOptions.$filter)
            .select(queryOptions.$select)
            .limit(queryOptions.$top)
            .skip(queryOptions.$skip)
            .sort(queryOptions.$sort)

        homeQuery = homeQuery.populate({
            path: 'userId',
            select: '_id name username avatar phone'
        })
        homeQuery = await homeQuery.exec();
        var homes = JSON.parse(JSON.stringify(homeQuery));

        return res.json({ error: false, data: homes });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
}

async function queryDispatcher(data) {
    await asyncForEach(Object.entries(data), async ([key, value]) => {
        if ((typeof value === "string") && key === 'city') {
            query = { ...query, ...{ "address.city": value } }
        } else
            if ((typeof value === "string") && key === 'district') {
                query = { ...query, ...{ "address.district": value } }
            } else
                if ((typeof value === "string") && key === 'ward') {
                    query = { ...query, ...{ "address.ward": value } }
                } else {
                    await queryDispatcher(value)
                }

    })
    return query;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}