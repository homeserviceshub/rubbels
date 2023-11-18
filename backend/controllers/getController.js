const productsModel = require("../models/productsModel");

const productsData = async (req, res) => {
  try {
    let data = await productsModel.find();
    console.log(data);
    res
      .status(200)
      .send({ success: true, message: "All Products", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = { productsData };
