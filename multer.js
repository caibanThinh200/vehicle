const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname.includes("jfif") ? file.originalname.replace("jfif", "png") : file.originalname)
    }
});

const upload = multer({ storage });
module.exports = upload;