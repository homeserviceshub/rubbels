const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  name: String,
  productcollection: String,
  price: String,
  size: Object,
  style: Object,
  artplacement: Object,
  discription: String,
  details: Array,
  photos: Array,
  availability: String,
  addingdate: Date,
});

module.exports = mongoose.model("products", productsSchema); //products is the collections name
