const multer = require("multer");
const path = require("path");


// Storage Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});


// Multer Upload
const upload = multer({
    storage: storage
});


module.exports = upload;