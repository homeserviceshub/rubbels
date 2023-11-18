import React from "react";
import "./card.css";
import CustomButton from "../customBtn";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SideTextCard() {
  const navigate = useNavigate();
  const goto = () => {
    navigate("/tshirts");
  };
  return (
    <Row className="main2">
      <Col className="p-0" lg={6}>
        <img src="./photos/photo1.jpg" alt="NoImage" className="sideImg" />
      </Col>

      <Col lg={6} className="parent-container">
        <div className="inner-container">
          <h1>Monkey D. Luffy T-Shirt</h1>

          <p className="information">
            The front of the T-shirt features a striking and detailed
            illustration of Monkey D. Luffy in his classic straw hat. Luffy's
            signature wide grin and his mysterious scar under his left eye are
            beautifully captured.
          </p>
          <div className="buttonContainer">
            <CustomButton
              text="Explore More"
              width="auto"
              height="auto"
              onClick={goto}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}
