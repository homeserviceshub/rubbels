const express = require("express");
const postRoute = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

postRoute.use(cors());
postRoute.use(bodyParser.json());
postRoute.use(express.json());
postRoute.use(express.static("public"));
postRoute.use(bodyParser.urlencoded({ extended: true }));

//multer is used for image storage

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(
//       null,
//       path.join(__dirname, "../public/postImages"),
//       function (error, success) {
//         if (error) {
//           console.log(error, "in destination");
//         }
//       }
//     );
//   },
//   filename: function (req, file, cb) {
//     new Date() + "-" + file.originalname;
//     cb(null, name, function (error, success) {
//       if (error) {
//         console.log(error, "in destination");
//       }
//     });
//   },
// });
// const upload = multer({ storage: storage });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images"); // Set your destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Upload route
postRoute.post("/upload", upload.single("media"), (req, res) => {
  const filePath = req.file;
  res.json({ filePath });
});

// // Add product route
// app.post("/addproduct", (req, res) => {
//   // Your existing addproduct route code
// });

const postController = require("../controllers/postController");
postRoute.post("/login", postController.login);
postRoute.post("/signup", postController.signUp);
postRoute.post("/favdata", postController.favdata);
postRoute.post("/selectedproductdata", postController.selectedproductdata);
postRoute.post("/razorpay/order", postController.orders);
postRoute.post("/razorpay/validate", postController.paymentValidation);
postRoute.post("/placeorder", postController.placeorder);
postRoute.post("/placeorderonline", postController.placeorderonline);
postRoute.post("/addproduct", postController.addproduct);
postRoute.post("/alterproduct", postController.alterproduct);
postRoute.post("/deleteproduct", postController.deleteproduct);
// postRoute.post("/acesignup", postController.acesignUp);
// postRoute.post("/login", postController.login);
// postRoute.post("/userdata", postController.getUserData);
// postRoute.post("/serviceRequest", postController.serviceRequest);

module.exports = postRoute;
