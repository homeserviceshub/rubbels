import React, { useEffect, useState } from "react";
import { Col, Form, Row, FloatingLabel } from "react-bootstrap";
import "./checkout.css";

import CustomButton from "../../components/customBtn";
import { State, City } from "country-state-city";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MySpinner from "../../components/spinner/spinner";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
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
  });
  const [checkvalidation, setCheckvalidation] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const { country_code, country_name } = response.data;
        setSelectedCountry(country_name);
        setSelectedCountryCode(country_code);
        setStates(State.getStatesOfCountry(country_code));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching geolocation data:", error);
      });

    const cart = localStorage.getItem("mycart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);
    }
  }, []);
  const calculateSubtotal = () => {
    let subtotal = 0;
    let totalProducts = 0;

    cartItems.forEach((item) => {
      subtotal += parseFloat(item.price) * item.quantity;
      totalProducts += item.quantity;
    });

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
  const handleProceedToPayment = async () => {
    setCheckvalidation(true);
    if (
      formData.firstName &&
      formData.lastName &&
      formData.addressLine1 &&
      formData.emailAddress &&
      formData.payment &&
      formData.phoneNumber &&
      formData.pincode &&
      formData.selectedCity &&
      formData.selectedCountry &&
      formData.selectedState
    ) {
      var amount = total * 100;
      var orderCreateData = null;
      console.log("Form Data:", formData);
      if (formData.payment === "Cash on Delivery") {
        try {
          setIsLoading(true);
          await axios
            .post("http://localhost:8000/placeorder", {
              name: formData.firstName + formData.lastName,
              email: formData.emailAddress,
              phoneNumber: formData.phoneNumber,
              addressLineOne: formData.addressLine1,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              pincode: formData.pincode,
              totalAmount: amount,
              productData: cartItems,
              paymentMode: formData.payment,
            })
            .then((response) => {
              if (response.status === 200) {
                console.log(
                  response?.data.data.payment_id,
                  "order data saved at backend"
                );
                setIsLoading(false);
                localStorage.setItem("mycart", "");
                navigate(`/thankyou/${response.data.data.payment_id}`);
              }
            })
            .catch((error) => {
              console.error("AxiosError:", error);
              console.log(error);
            });
        } catch (error) {
          console.error("Error validating payment:", error);
        }
      } else {
        try {
          // Make a request to your Node.js server to create a Razorpay order
          const orderRequest = await axios
            .post("http://localhost:8000/razorpay/order", {
              amount: amount,
            })
            .then((response) => {
              if (response.status === 200) {
                orderCreateData = response.data;
              }
            })
            .catch((error) => {
              console.error("AxiosError:", error);
              console.log(error);
            });
          console.log(orderCreateData, "hahah");

          const options = {
            key: "rzp_test_5pfNpiDbd7URJi",
            amount: amount, // amount in the smallest currency unit
            currency: "INR",
            order_id: orderCreateData.id,
            name: "Rubbals Cloth House",
            description: "Full Payment",
            // image: "https://your-logo-url.com/logo.png",
            handler: async (response) => {
              try {
                // Validate the payment on your server
                console.log(response.razorpay_payment_id);
                const validatePaymentResponse = await axios.post(
                  "http://localhost:8000/razorpay/validate",
                  {
                    payment_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                  }
                );

                if (validatePaymentResponse.status === 200) {
                  try {
                    await axios
                      .post("http://localhost:8000/placeorderonline", {
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        name: formData.firstName + formData.lastName,
                        email: formData.emailAddress,
                        phoneNumber: formData.phoneNumber,
                        addressLineOne: formData.addressLine1,
                        city: formData.city,
                        state: formData.state,
                        country: formData.country,
                        pincode: formData.pincode,
                        totalAmount: amount,
                        productData: cartItems,
                        paymentMode: formData.payment,
                      })
                      .then((response) => {
                        if (response.status === 200) {
                          localStorage.setItem("mycart", "");
                          navigate(
                            `/thankyou/${response.data.data.payment_id}`
                          );
                        }
                      })
                      .catch((error) => {
                        console.error("AxiosError:", error);
                        console.log(error);
                      });
                  } catch (error) {
                    console.error("Error validating payment:", error);
                  }
                } else {
                  // Handle invalid payment
                  console.error("Invalid payment");
                  alert("Invalid Payment");
                }
              } catch (error) {
                console.error("Error validating payment:", error);
              }
            },
            prefill: {
              name: "Harman Sidhu",
              email: "harman@gmail.com",
              contact: "8054875055",
            },
            theme: {
              color: "#000000",
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.on("payment.failed", function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
          });
          razorpay.open();
        } catch (error) {
          console.error("Error initializing payment:", error);
        }
      }
    } else {
      alert("fill all the fields");
      console.log("Fill Form Data:", formData);
    }
  };

  return (
    <>
      {isLoading ? (
        <MySpinner />
      ) : (
        <div className="containerX containerZ">
          <Row className="AddedItem">
            <Col lg={5} className="">
              <h4 className="accountHolder">
                Have an account?{" "}
                <span className="login" onClick={() => {}}>
                  Login
                </span>{" "}
              </h4>
              {/* <div></div> */}
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
                {checkvalidation && !formData.firstName && (
                  <small style={{ color: "red" }}>
                    This Field is Mandatory
                  </small>
                )}
                <FloatingLabel label="Last Name" className="mt-3">
                  <Form.Control
                    name="lastName"
                    onChange={handleInputChange}
                    type="text"
                    className="formField"
                    placeholder="Last Name"
                  />
                  {checkvalidation && !formData.lastName && (
                    <small style={{ color: "red" }}>
                      This Field is Mandatory
                    </small>
                  )}
                </FloatingLabel>
                <FloatingLabel label="Address Line 1" className="mt-3">
                  <Form.Control
                    onChange={handleInputChange}
                    name="addressLine1"
                    type="text"
                    className="formField"
                    placeholder="Address Line 1"
                  />
                  {checkvalidation && !formData.addressLine1 && (
                    <small style={{ color: "red" }}>
                      This Field is Mandatory
                    </small>
                  )}
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
                  <Col
                    lg={6}
                    style={{
                      marginBottom:
                        checkvalidation && !formData.pincode ? "1.5rem" : 0,
                    }}
                  >
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
                    {checkvalidation && !formData.pincode && (
                      <small style={{ color: "red" }}>
                        This Field is Mandatory
                      </small>
                    )}
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
                {checkvalidation && !formData.phoneNumber && (
                  <small style={{ color: "red" }}>
                    This Field is Mandatory
                  </small>
                )}
                {checkvalidation ? (
                  formData.phoneNumber && (
                    <Form.Text className="text-muted">
                      A carrier might contact you to confirm delivery.
                    </Form.Text>
                  )
                ) : (
                  <Form.Text className="text-muted">
                    A carrier might contact you to confirm delivery.
                  </Form.Text>
                )}

                <FloatingLabel label="Email Address" className="mt-3">
                  <Form.Control
                    onChange={handleInputChange}
                    type="text"
                    name="emailAddress"
                    className="formField"
                    placeholder="Email Address"
                  />
                </FloatingLabel>
                {checkvalidation && !formData.emailAddress && (
                  <small style={{ color: "red" }}>
                    This Field is Mandatory
                  </small>
                )}
                {checkvalidation ? (
                  formData.emailAddress && (
                    <Form.Text className="text-muted">
                      A confirmation email will be sent after checkout.
                    </Form.Text>
                  )
                ) : (
                  <Form.Text className="text-muted">
                    A confirmation email will be sent after checkout.
                  </Form.Text>
                )}

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
                      checked={
                        formData.payment === "UPI/Debit Card/Net Banking"
                      }
                    />
                  </div>
                </div>
              </Form>
            </Col>
            <Col lg={3} className="pt-3">
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
                  customClass="newcustomcartbtn"
                  onClick={() => {
                    handleProceedToPayment();
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Checkout;
