import React from "react";
import "./profile.css";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import Orders from "../../components/orders/orders";

const Profile = () => {
  return (
    <Container className="containerX">
      <Row className="m-0">
        <Col lg={6}>
          <div className="profilePhoto">
            <img
              src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
              height={"100%"}
              width={"100%"}
              className="pimg"
            />
          </div>
          <FloatingLabel label="Username" className="mt-3">
            <Form.Control
              // onChange={handleInputChange}
              value={"Harman Sidhu"}
              name="Username"
              type="text"
              className="formField"
              placeholder="Username"
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mt-3">
            <Form.Control
              // onChange={handleInputChange}
              value={"Password"}
              name="Password"
              type="password"
              className="formField"
              placeholder="Password"
            />
          </FloatingLabel>
          <FloatingLabel label="Joining Date" className="mt-3">
            <Form.Control
              // onChange={handleInputChange}
              value={"Joining Date"}
              name="Joining Date"
              type="text"
              className="formField"
              placeholder="Joining Date"
            />
          </FloatingLabel>
          <FloatingLabel label="Phone Number" className="mt-3">
            <Form.Control
              // onChange={handleInputChange}
              value={"8054875055"}
              name="phoneNumber"
              type="text"
              className="formField"
              placeholder="Phone Number"
            />
          </FloatingLabel>
          <FloatingLabel label="Email" className="mt-3">
            <Form.Control
              // onChange={handleInputChange}
              value={"abc@gmail.com"}
              name="Email"
              type="email"
              className="formField"
              placeholder="Email"
            />
          </FloatingLabel>
        </Col>
        <Col lg={6}>
          <Orders />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
