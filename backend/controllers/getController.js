const productsModel = require("../models/productsModel");

const productsData = async (req, res) => {
  try {
    let data = await productsModel.find();

    res
      .status(200)
      .send({ success: true, message: "All Products", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const newproductData = async (req, res) => {
  try {
    let data = await productsModel.find().sort({ createdAt: -1 }).limit(9);

    res
      .status(200)
      .send({ success: true, message: "New Products", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = { productsData, newproductData };
