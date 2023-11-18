import React, { useEffect, useState } from "react";
import "./favourites.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { Col, Row } from "react-bootstrap";

const Favourites = () => {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="containerX containerZ">
      <h3>FAVOURITES</h3>

      <Row className="AddedItem">
        <Col lg={7} className="itemInner">
          <hr />
          <div className="singleItem">
            <div className="itemInnerLeft">
              <div className="thumb">
                <img src="/photos/photo1.jpg" className="thumbimg" alt="abc" />
              </div>
              <div className="details">
                <p className="parah">Product Name: Luffy T-shirt </p>
                <p className="parah">Category: Anime </p>
                <p className="parah">Price: $20</p>
              </div>
            </div>
            <div className="itemInnerRight">
              <span className="favSpan">
                <ImBin2 />
              </span>
            </div>
          </div>
          <hr />
        </Col>
      </Row>
    </div>
  );
};

export default Favourites;
