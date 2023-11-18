// InfiniteCardSlider.js

import React, { useState } from "react";
import "./CardSlider.css";

function InfiniteCardSlider() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const cards = ["Card 1", "Card 2", "Card 3"];
  const previousCardIndex =
    (currentCardIndex + cards.length - 1) % cards.length;
  const handleNextClick = () => {
    setCurrentCardIndex((currentCardIndex + 1) % cards.length);
  };

  return (
    <div className="infinite-card-slider">
      {cards.map((card, index) => (
        <div
          key={index}
          className={` ${
            index === currentCardIndex
              ? "card1"
              : index === previousCardIndex
              ? "card3"
              : "card2"
          }`}
        >
          <img src="./photos/photo1.jpg" alt="new" className="img" />
          {card}
        </div>
      ))}
      <button onClick={handleNextClick} className="next-button">
        Next
      </button>
    </div>
  );
}

export default InfiniteCardSlider;
