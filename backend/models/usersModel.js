const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  joiningDate: Date,
  gender: String,
  number: Number,
});

module.exports = mongoose.model("users", productsSchema); //products is the collections name
