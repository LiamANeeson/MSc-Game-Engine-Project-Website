﻿const util = require("util");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    
    destination: path.join(__dirname, '../public', 'uploads'),
    filename(req, file, callback) {
       
        callback(null, Date.now() + path.extname(file.originalname));
    }
});



const maxSize = 10 * 1024 * 1024;
var uploadFiles = multer({ storage: storage, limits: { fileSize: maxSize } }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;