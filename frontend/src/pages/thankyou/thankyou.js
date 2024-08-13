import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./thankyou.css";
import CustomButton from "../../components/customBtn";

const Thankyou = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Container className="thankyouContainer2">
      <Row>
        <Col lg={12} className="text-center">
          <h1>Order Successfull</h1>
        </Col>
        <Col lg={12} className="text-center">
          Referance ID : {id}
        </Col>
        <Col className="mt-5 mx-3">
          <CustomButton
            text={"Return to Home Page"}
            onClick={() => {
              navigate("/");
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Thankyou;
