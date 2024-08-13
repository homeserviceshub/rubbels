import React from "react";
import "./cart.css";
import { Col, Row } from "react-bootstrap";
import CustomButton from "../customBtn";
import IconTick from "../icons/IconTick";
import { useDispatch } from "react-redux";
import { AddToBag } from "../../redux/actions/addToBag";
import { useNavigate } from "react-router-dom";

const SmallCart = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(productData, "aunda data");
  return (
    <div className="cartContainer">
      <Row className="p-0 m-0">
        <Col lg={12} className=" close pb-2 mt-2 mb-1">
          <IconTick /> Item Added Successfully{" "}
          <span
            className="crossBtn"
            onClick={() => {
              dispatch(AddToBag(false));
            }}
          >
            X
          </span>
        </Col>
        <Col lg={5} className="imgCol">
          <img
            src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
            className="imge"
            alt="Added Item"
          />
        </Col>
        <Col lg={7}>
          <div>{productData.name}</div>
          <div>Size : {productData.selectedSize}</div>
          <div>Style : {productData.selectedStyle}</div>
          <div>Art Placement : {productData.selectedArt}</div>
        </Col>
        <div className="buttons">
          <CustomButton
            customClass="nosmalltext"
            text={"View All"}
            onClick={() => {
              navigate("/mycart");
              dispatch(AddToBag(false));
            }}
          />
          <CustomButton customClass="nosmalltext" text={"Checkout"} />
        </div>
      </Row>
    </div>
  );
};

export default SmallCart;
