const mongoose = require("mongoose");

const orders = mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhoneNo: Number,
  customerAddress1: String,
  customerCity: String,
  customerState: String,
  customerCountry: String,
  customerPinCode: String,
  paymentMode: String,
  payment_id: String,
  order_id: String,
  amount: Number,
  products: Array,
  orderDate: Date,
});

module.exports = mongoose.model("orders", orders);
