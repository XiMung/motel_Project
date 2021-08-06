var { userModel } = require("../models/user.model");
var queryParser = require('../configs/queryParser');
const tv4 = require('tv4');
const UserSchema = require('../schemas/User.schema.json');
var crypto = require("crypto");
var jwt = require('jsonwebtoken');
var cons = require('../../cons');

module.exports = {
    register: register,
    login: login,
    getAll: getAll,
    getOne: getOne
}

async function register(req, res) {
    try {
        var body = req.body;
        var schema = tv4.validateResult(body, UserSchema, true, true);
        if (!schema.valid) {
            return res.status(400).json({ error: `${schema.error.dataPath}: ${schema.error.message}` });
        }
        var email = req.body.username;
        if (!email) {
            return res.json({ error: true, message: 'username empty' });
        }
        if (!cons.paterEmail.test(email)) {
            res.json({
                statuscode: 400,
                message: "email not exist"
            });
            return;
        }
        var password = body.password;
        if (!password) {
            return res.json({ error: true, message: 'password empty' });
        }
        var role = body.role;
        if (!role) {
            return res.json({ error: true, message: 'role empty' });
        }
        var phone = body.phone;
        if (!phone) {
            return res.json({ error: true, message: 'phone empty' });
        }
        var name = body.name;
        if (!name) {
            return res.json({ error: true, message: 'name empty' });
        }

        try {
            var hash = await crypto.createHmac('sha256', cons.keyPass)
                .update(password)
                .digest('hex');
        } catch (err) {
            return res.json({ error: true, message: 'hash false: ' + err });
        }

        password = hash;
        var user = new userModel({
            username: email,
            password: password,
            role: role,
            avatar: "",
            active: true,
            phone: phone,
            name: name
        });
        var data = await user.save();
        return res.json({ error: false, data: data });
    } catch (error) {
        return res.json({ error: true, message: error.message });
    }
}

async function login(req, res) {
    try {
        var email = req.body.username;
        if (!email) {
            res.json({
                statuscode: 400,
                message: "bạn chưa nhập username"
            });
            return;
        }
        if (!cons.paterEmail.test(email)) {
            res.json({
                statuscode: 400,
                message: "cú pháp mail của bạn không hợp lệ"
            });
            return;
        }

        var password = req.body.password;
        if (!password) {
            res.json({
                statuscode: 400,
                message: "bạn chưa nhập password"
            });
            return;
        }

        let data = await userModel.findOne({ username: email });
        if (data) {
            var hash = crypto.createHmac('sha256', cons.keyPass)
                .update(password)
                .digest('hex');

            if (hash == data.password) {
                var token = jwt.sign({
                    email: data.username,
                    role: data.role,
                    iat: new Date().getTime(),
                    exp: new Date().setDate(new Date().getDate() + 1)
                }, cons.keyToken);
                return res.json({ error: false, data: data, token: token });
            } else {
                return res.json({ error: true, message: 'sai password đăng nhập' });
            }
        } else {
            return res.json({ error: true, message: 'sai email đăng nhập' });
        }
    } catch (error) {
        return res.json({ error: true, message: error });
    }
}

async function getAll(req, res) {
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
        // var queryStack = [];
        // queryStack.push({
        //     $project: queryOptions.$select
        // });
        // queryStack.push({
        //     $match: queryOptions.$filter
        // });
        // queryStack.push({
        //     $sort: queryOptions.$sort
        // });
        // queryStack.push({
        //     $skip: queryOptions.$skip
        // });
        // queryStack.push({
        //     $limit: queryOptions.$top
        // });
        // var query = userModel.aggregate(queryStack);


        var userQuery = userModel
            .find(queryOptions.$filter)
            .select(queryOptions.$select)
            .limit(queryOptions.$top)
            .skip(queryOptions.$skip)
            .sort(queryOptions.$sort)

        // userQuery = userQuery.populate({
        //     path: 'role',
        //     select: '_id name'
        // })

        userQuery = await userQuery.exec();
        var users = JSON.parse(JSON.stringify(userQuery));

        return res.json({ error: false, data: users });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
};

async function getOne(req, res) {
    try {
        var queryOptions = queryParser(req);
        if (queryOptions.error) {
            return res.status(400).send(queryOptions.error);
        }
        queryOptions.$filter = queryOptions.$filter || {};
        if (!queryOptions.$select) queryOptions.$select = {};


        var userQuery = userModel
            .find(queryOptions.$filter)
            .select(queryOptions.$select)

        // userQuery = userQuery.populate({
        //     path: 'role',
        //     select: '_id name'
        // })

        userQuery = await userQuery.exec();
        var users = JSON.parse(JSON.stringify(userQuery));

        return res.json({ error: false, data: users });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
};

