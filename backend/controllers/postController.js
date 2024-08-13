const usersModel = require("../models/usersModel");
const ordersModel = require("../models/ordersModel");
// const serviceRequestModel = require("../models/serviceRequestModel");
const productsModel = require("../models/productsModel");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
const razorpay = new Razorpay({
  key_id: "rzp_test_5pfNpiDbd7URJi",
  key_secret: "N9jI9vbEWj0cFEaHdfZW8irE",
});

const signUp = async (req, res) => {
  try {
    let newUser = new usersModel({
      gender: req.body.gender,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      number: req.body.number,
      joiningDate: new Date(),
    });
    const doc = await newUser.save();
    res
      .status(200)
      .send({ success: true, message: "New User Created", data: doc });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const acesignUp = async (req, res) => {
  try {
    const user = await postModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      user.isAce = true;
      const doc = await user.save();
      res
        .status(201)
        .send({ success: true, message: "User updated as Ace", data: doc });
    } else {
      // Handle the case when no user is found
      res.status(404).send({ success: false, message: "User not found" });
    }
    // const users = await postModel.find({
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    // if (users.length > 0) {
    //   let newUser = new postModel({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //     joiningDate: new Date(),
    //     isAce: true,
    //   });
    //   const doc = await newUser.save();
    //   res
    //     .status(200)
    //     .send({ success: true, message: "New User Created", data: doc });
    // }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const serviceRequest = async (req, res) => {
  try {
    let newRequest = new serviceRequestModel({
      customerID: req.body.fromDetails.customerID, //
      clientId: req.body.fromDetails.clientId, //
      customerDetails: {
        name: req.body.fromDetails.fullname, //
        email: req.body.fromDetails.email, //
        address: req.body.fromDetails.address, //
        postalCode: req.body.fromDetails.postalcode, //
        number: req.body.fromDetails.number, //
      },
      requestDate: new Date(),
      status: req.body.fromDetails.status, //
      selectedService: req.body.fromDetails.selectedService, //
      accommodation: req.body.fromDetails.accommodation, //
      serviceNeed: req.body.fromDetails.serviceNeed, //
      discription: req.body.fromDetails.discription, //
    });
    const doc = await newRequest.save();
    res.status(200).send({
      success: true,
      message: "New Service Request Created",
      data: doc,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const users = await usersModel.find({
      email: req.body.email,
      password: req.body.password,
    });

    if (users.length > 0) {
      return res.json(users);
    } else {
      return res.json({ message: "No User Found" });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const getUserData = async (req, res) => {
  try {
    const users = await postModel.find({
      _id: req.body._id,
    });
    return res.json(users);
  } catch (error) {
    console.error("Error:", error);
  }
};
const orders = async (req, res) => {
  try {
    const orderOptions = {
      amount: req.body.amount,
      currency: "INR",
    };
    const response = await razorpay.orders.create(orderOptions);

    return res.json(response);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send("Internal Server Error");
  }
};
const paymentValidation = async (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  // Validate the payment using Razorpay's signature verification
  const generatedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  const receivedSignature = signature;

  if (generatedSignature === receivedSignature) {
    // Signature verification successful, payment is authentic
    // Perform any additional business logic here

    res.status(200).json({ success: true });
  } else {
    // Signature verification failed, payment is not authentic
    res.status(400).json({ success: false, error: "Invalid payment" });
  }
};
const placeorder = async (req, res) => {
  const {
    paymentMode,
    name,
    email,
    phoneNumber,
    addressLineOne,
    city,
    state,
    country,
    pincode,
    totalAmount,
    productData,
  } = req.body;
  try {
    var codReferenceId = `${uuidv4()}`;

    let newOrder = new ordersModel({
      customerName: name,
      customerEmail: email,
      customerPhoneNo: phoneNumber,
      customerAddress1: addressLineOne,
      customerCity: city,
      customerState: state,
      customerCountry: country,
      customerPinCode: pincode,
      paymentMode: paymentMode,
      payment_id: codReferenceId,
      order_id: codReferenceId,
      amount: totalAmount,
      products: productData,
      orderDate: new Date(),
    });
    const data = await newOrder.save();
    res
      .status(200)
      .send({ success: true, message: "New order Created", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const alterproduct = async (req, res) => {
  const { id } = req.body;
  try {
    // const {  } = req.body;

    // Find the product by ID
    const product = await productsModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product fields with new data
    Object.assign(product, req.body);

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const deleteproduct = async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  try {
    const product = await productsModel.findByIdAndDelete(_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const addproduct = async (req, res) => {
  const {
    productName,
    productCollection,
    price,
    size,
    style,
    artplacement,
    discription,
    details,
    mediaFiles,
    availability,
    addingdate,
    gender,
  } = req.body;
  try {
    let newProduct = new productsModel({
      name: productName,
      productcollection: productCollection,
      price: price,
      size: size,
      style: style,
      artplacement: artplacement,
      discription: discription,
      details: details,
      mediafiles: mediaFiles,
      availability: availability,
      addingdate: addingdate,
      gender: gender,
    });
    const data = await newProduct.save();
    res
      .status(200)
      .send({ success: true, message: "New Product Added", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const placeorderonline = async (req, res) => {
  const {
    payment_id,
    order_id,
    paymentMode,
    name,
    email,
    phoneNumber,
    addressLineOne,
    city,
    state,
    country,
    pincode,
    totalAmount,
    productData,
  } = req.body;
  try {
    let newOrder = new ordersModel({
      customerName: name,
      customerEmail: email,
      customerPhoneNo: phoneNumber,
      customerAddress1: addressLineOne,
      customerCity: city,
      customerState: state,
      customerCountry: country,
      customerPinCode: pincode,
      paymentMode: paymentMode,
      payment_id: payment_id,
      order_id: order_id,
      amount: totalAmount,
      products: productData,
      orderDate: new Date(),
    });
    const data = await newOrder.save();
    res
      .status(200)
      .send({ success: true, message: "New order Created", data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
const selectedproductdata = async (req, res) => {
  try {
    const productData = await productsModel.findById(req.body.id);

    if (productData) {
      res.json(productData); // Sending the product data as a response
    } else {
      res.status(404).json({ message: "No Product Found" }); // Product not found
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
const favdata = async (req, res) => {
  try {
    const frontendIDs = req.body.favData;
    const productsInfo = [];
    for (const frontendID of frontendIDs) {
      try {
        const productData = await productsModel.findById(frontendID);
        if (productData) {
          productsInfo.push(productData);
        }
      } catch (error) {
        console.error(`Error fetching product with ID ${frontendID}:`, error);
        // Handle specific error types if needed
      }
    }

    if (productsInfo.length > 0) {
      res.json(productsInfo);
    } else {
      res.json({ message: "No Products Found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  login,
  favdata,
  selectedproductdata,
  orders,
  paymentValidation,
  placeorder,
  placeorderonline,
  addproduct,
  alterproduct,
  deleteproduct,
};
