import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import "./admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <Container className="containerX">
      <Row className="px-3">
        <Col>
          <h1>Welcome Admin</h1>
        </Col>
      </Row>
      <Row className=" px-3 my-4 CrudDiv">
        <Col className="d-flex justify-content-center">
          <CustomButton
            text={"Add New Product"}
            onClick={() => navigate("newproduct")}
          />
        </Col>
        <Col className="d-flex justify-content-center">
          <CustomButton
            text={"Alter Product"}
            onClick={() => navigate("alterproduct")}
          />
        </Col>
        <Col className="d-flex justify-content-center">
          <CustomButton
            text={"Delete Product"}
            onClick={() => navigate("deleteproduct")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
