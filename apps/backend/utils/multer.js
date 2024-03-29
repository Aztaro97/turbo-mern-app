const multer = require("multer");

// Multer setup
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  var upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //   if (
    //     file.mimetype == "image/png" ||
    //     file.mimetype == "image/jpg" ||
    //     file.mimetype == "image/jpeg"
    //   ) {
    //     cb(null, true);
    //   } else {
    //     cb(null, false);
    //     return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    //   }
    // },
  });
  

  module.exports = upload;