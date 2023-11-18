import React from "react";
import "./card.css";
import CustomButton from "../customBtn";
import { useNavigate } from "react-router-dom";

export default function TextCard() {
  const navigate = useNavigate();
  const goto = () => {
    navigate("/tshirts");
  };
  const gotoTshirt = () => {
    navigate("/tshirts/tshirt");
  };
  return (
    <div className="main">
      <img src="./photos/photo1.jpg" alt="cardImages" className="background" />
      <div className="overlay">
        <h1 className="cardTitle">Monkey D. Luffy T-Shirt</h1>
        <h4 className="cardSubtitle">Collection from Anime</h4>
        <p className="information">
          The front of the T-shirt features a striking and detailed illustration
          of Monkey D. Luffy in his classic straw hat. Luffy's signature wide
          grin and his mysterious scar under his left eye are beautifully
          captured.
        </p>
        <div className="buttonContainer">
          <CustomButton
            text="Buy Now!"
            width="auto"
            height="auto"
            onClick={gotoTshirt}
          />
          <CustomButton
            text="See More"
            width="auto"
            height="auto"
            onClick={goto}
          />
        </div>
      </div>
    </div>
  );
}
