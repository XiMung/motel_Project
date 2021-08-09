var { addressModel } = require("../models/address.model");

module.exports = {
    get: get
}

async function get(req, res) {
    try {
        var addressQuery = addressModel.find();

        addressQuery = await addressQuery.exec();
        await asyncForEach(addressQuery, async item => {
            await asyncForEach(item.district, async a => {
                delete a.street;
            });
        });
        var address = JSON.parse(JSON.stringify(addressQuery));

        return res.json({ error: false, data: address });
    } catch (error) {
        return res.json({ error: true, message: error });
    }
}


async function asyncForEach(a, c) {
    for (let i = 0; i < a.length; i++) {
        await c(a[i], i, a)
    }
}