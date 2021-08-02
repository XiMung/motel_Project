let multer = require('multer');
let path = require('path');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var outputPath = path.resolve(__dirname + '../../public/');
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
        // let outputPath = path.resolve(__dirname, '../public/upload/')
        cb(null, outputPath)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

let upload = multer({ storage: storage })
exports.upload = upload;