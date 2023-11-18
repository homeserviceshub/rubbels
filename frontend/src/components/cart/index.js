import React from "react";
import "./cart.css";
import { Col, Row } from "react-bootstrap";
import CustomButton from "../customBtn";
import IconTick from "../icons/IconTick";

const SmallCart = () => {
  return (
    <div className="cartContainer">
      <Row className="p-0 m-0">
        <Col lg={12} className=" close pb-2 mt-2 mb-1">
          <IconTick /> Item Added Successfully{" "}
          <span className="crossBtn">X</span>
        </Col>
        <Col lg={5} className="imgCol">
          <img src="./photos/photo1.jpg" className="imge" alt="Added Item" />
        </Col>
        <Col lg={7}>
          <div>Luffy Tshirt</div>
          <div>Size : L</div>
          <div>Style : OVERSIZED</div>
          <div>Art Placement : BACK</div>
        </Col>
        <div className="buttons">
          <CustomButton text={"View All"} />
          <CustomButton text={"Checkout"} />
        </div>
      </Row>
    </div>
  );
};

export default SmallCart;
