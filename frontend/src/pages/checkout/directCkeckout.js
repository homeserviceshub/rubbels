import React, { useEffect, useState } from "react";
import { Col, Form, Row, FloatingLabel } from "react-bootstrap";
import "./checkout.css";

import CustomButton from "../../components/customBtn";
import { State, City } from "country-state-city";
import axios from "axios";

const DirectCheckout = () => {
  const [checkoutItem, setCheckoutItem] = useState();
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    selectedCountry: selectedCountry,
    selectedState: selectedState,
    selectedCity: selectedCity,
    pincode: "",
    phoneNumber: "",
    emailAddress: "",
    payment: "Cash on Delivery",
    productDetails: "",
  });
  console.log(checkoutItem);

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const { country_code, country_name } = response.data;
        setSelectedCountry(country_name);
        setSelectedCountryCode(country_code);
        setStates(State.getStatesOfCountry(country_code));
      })
      .catch((error) => {
        console.error("Error fetching geolocation data:", error);
      });

    const selectedFilter = localStorage.getItem("selectedDetails");
    if (selectedFilter) {
      const newselectedFilter = JSON.parse(selectedFilter);
      setCheckoutItem(newselectedFilter);
      setFormData({ ...formData, productDetails: newselectedFilter });
    }
  }, []);
  const calculateSubtotal = () => {
    let subtotal = 0;
    let totalProducts = 0;
    subtotal += parseFloat(checkoutItem?.price) * checkoutItem?.quantity;
    totalProducts += checkoutItem?.quantity;

    return { subtotal, totalProducts };
  };
  const { subtotal, totalProducts } = calculateSubtotal();
  const shippingFee = 50 * totalProducts;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleStateChange = (state) => {
    setSelectedState(state);
    const stateCities = City.getCitiesOfState(
      selectedCountryCode,
      state.isoCode
    );
    setSelectedCity("");
    setCities(stateCities);
    setFormData({
      ...formData,
      selectedState: state.name,
    });
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setFormData({
      ...formData,
      selectedCity: city.name,
    });
  };
  const handleProceedToPayment = () => {
    if (
      !!formData.firstName ||
      !!formData.lastName ||
      !!formData.addressLine1 ||
      !!formData.emailAddress ||
      !!formData.payment ||
      !!formData.phoneNumber ||
      !!formData.pincode ||
      !!formData.productDetails ||
      !!formData.selectedCity ||
      !!formData.selectedCountry ||
      !!formData.selectedState
    ) {
      alert("fill all the fields");
    }
    console.log("Form Data:", formData);
  };

  return (
    <div className="containerX containerZ">
      <Row className="AddedItem">
        <Col lg={5} className="">
          <h4 className="accountHolder">
            Have an account?{" "}
            <span className="login" onClick={() => {}}>
              Login
            </span>{" "}
          </h4>
          <div className="singleItem customCheck mt-5">
            <div className="itemInnerLeft">
              <div className="thumb">
                <img
                  src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
                  className="thumbimg"
                />
              </div>
              <div className="details">
                <p className="parah">
                  Product Name: {checkoutItem?.name.toUpperCase()}
                </p>
                <p className="parah">
                  Category: {checkoutItem?.collection.toUpperCase()}{" "}
                </p>
                <p className="parah">
                  Style: {checkoutItem?.selectedStyle.toUpperCase()}{" "}
                </p>
                <p className="parah">
                  Size: {checkoutItem?.selectedSize.toUpperCase()}{" "}
                </p>
                <p className="parah">
                  Art Placement:{checkoutItem?.selectedArt.toUpperCase()}
                </p>
                <p className="parah">Price: {checkoutItem?.price}</p>
                <p className="parah">Quantity: {checkoutItem?.quantity}</p>
              </div>
            </div>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mt-5"
          >
            <h3>Enter Your Details</h3>
            <FloatingLabel className="mt-3" label="First Name">
              <Form.Control
                name="firstName"
                onChange={handleInputChange}
                className="formField"
                type="text"
                placeholder="First Name"
              />
            </FloatingLabel>
            <FloatingLabel label="Last Name" className="mt-3">
              <Form.Control
                name="lastName"
                onChange={handleInputChange}
                type="text"
                className="formField"
                placeholder="Last Name"
              />
            </FloatingLabel>
            <FloatingLabel label="Address Line 1" className="mt-3">
              <Form.Control
                onChange={handleInputChange}
                name="addressLine1"
                type="text"
                className="formField"
                placeholder="Address Line 1"
              />
            </FloatingLabel>
            <FloatingLabel label="Address Line 2" className="mt-3">
              <Form.Control
                onChange={handleInputChange}
                name="addressLine2"
                type="text"
                className="formField"
                placeholder="Address Line 2"
              />
            </FloatingLabel>

            <Row className="">
              <Col lg={6}>
                <FloatingLabel label="Country" className="mt-3">
                  <Form.Control
                    onChange={handleInputChange}
                    name="country"
                    type="text"
                    value={selectedCountry}
                    className="formField"
                    placeholder="Country"
                  />
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <div className="mt-3 pb-3 h-100 ">
                  <Form.Select
                    className="formField  h-100"
                    variant="outline-secondary"
                    id="states"
                    onChange={(e) =>
                      handleStateChange(JSON.parse(e.target.value))
                    }
                    value={
                      selectedState
                        ? JSON.stringify(selectedState)
                        : "Select State"
                    }
                  >
                    <option className="" selected disabled>
                      Select State
                    </option>
                    {states.map((state, index) => (
                      <option key={index} value={JSON.stringify(state)}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Col>
            </Row>
            <Row className="">
              <Col lg={6}>
                <div className="mt-3 pb-3 h-100 ">
                  <Form.Select
                    className="formField  h-100"
                    variant="outline-secondary"
                    id="Locality"
                    onChange={(e) => {
                      handleCityChange(JSON.parse(e.target.value));
                    }}
                    value={
                      selectedCity
                        ? JSON.stringify(selectedCity)
                        : "Select Locality"
                    }
                  >
                    <option className="" selected disabled>
                      Select Locality
                    </option>
                    {cities.map((city, index) => (
                      <option key={index} value={JSON.stringify(city)}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Col>
              <Col lg={6}>
                <FloatingLabel label="Pincode" className="mt-3">
                  <Form.Control
                    onChange={handleInputChange}
                    name="pincode"
                    type="text"
                    className="formField"
                    placeholder="Pincode"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel label="Phone Number" className="mt-3">
              <Form.Control
                onChange={handleInputChange}
                name="phoneNumber"
                type="text"
                className="formField"
                placeholder="Phone Number"
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              A carrier might contact you to confirm delivery.
            </Form.Text>
            <FloatingLabel label="Email Address" className="mt-3">
              <Form.Control
                onChange={handleInputChange}
                type="text"
                name="emailAddress"
                className="formField"
                placeholder="Email Address"
              />
            </FloatingLabel>
            <Form.Text className="text-muted">
              A confirmation email will be sent after checkout.
            </Form.Text>
            <div className="mt-5">
              <h3>Payment Method</h3>
              <div className="payment mt-3" key={"cod"}>
                <Form.Check
                  onChange={handleInputChange}
                  type="radio"
                  name="payment"
                  label={`Cash on Delivery`}
                  value={"Cash on Delivery"}
                  id={"Cash on Delivery"}
                  checked={formData.payment === "Cash on Delivery"}
                />
              </div>
              <div className="payment mt-3" key={"other"}>
                <Form.Check
                  onChange={handleInputChange}
                  value="UPI/Debit Card/Net Banking"
                  type="radio"
                  name="payment"
                  label={`UPI/Debit Card/Net Banking`}
                  id={"UPI/Debit Card/Net Banking"}
                  checked={formData.payment === "UPI/Debit Card/Net Banking"}
                />
              </div>
            </div>
          </Form>
        </Col>
        <Col lg={3}>
          <h3>Summary</h3>
          <hr />
          <div className="mt-3 mb-3">Subtotal: ${subtotal}</div>
          <div className="mt-3 mb-3">Shipping Fee: ${shippingFee}</div>
          <hr />
          <div className="mt-3 mb-3">Total Price: ${total}</div>
          <hr />
          <div className="mt-5">
            <CustomButton
              text={
                formData.payment === "Cash on Delivery"
                  ? "Place Order"
                  : "Proceed to Payment"
              }
              onClick={() => {
                handleProceedToPayment();
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DirectCheckout;
