const postModel = require("../models/postModel");
const serviceRequestModel = require("../models/serviceRequestModel");

const signUp = async (req, res) => {
  try {
    let newUser = new postModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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
    console.log(user, "akakak");
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
    const users = await postModel.find({
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

// module.exports = { signUp, login, getUserData, serviceRequest, acesignUp };
