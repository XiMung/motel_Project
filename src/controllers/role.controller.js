var { roleModel } = require("../models/role.model");
var queryParser = require('../configs/queryParser');

module.exports = {
    create: create,
    getRole: getRole,
}

async function create(req, res) {
    try {
        var name = req.body.name;
        if (!name) {
            return res.json({ error: true, message: 'Name empty' });
        }
        var role = new roleModel({name: name});
        var data = await role.save();
        return res.json({ error: false, data: data });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
}

async function getRole(req, res) {
    try {
        var queryOptions = queryParser(req);
        if (queryOptions.error) {
            return res.status(400).send(queryOptions.error);
        }
        queryOptions.$filter = queryOptions.$filter || {};
        if (!queryOptions.$select) queryOptions.$select = {};


        var roleQuery = roleModel
            .find(queryOptions.$filter)
            .select(queryOptions.$select)

            roleQuery = await roleQuery.exec();
        var roles = JSON.parse(JSON.stringify(roleQuery));

        return res.json({ error: false, data: roles });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
}