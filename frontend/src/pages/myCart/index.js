import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./myCart.css";
import QuantitySelector from "../../components/quantitySelector/quantitySelector";
import { ImBin2 } from "react-icons/im";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MyCart = () => {
  const [quantity, setQuantity] = useState(1);
  const [fav, setFav] = useState(false);
  const [totalItems, setTotalItems] = useState([1, 2, 3]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  return (
    <div className="containerX containerZ">
      <h3>CART</h3>

      <Row className="AddedItem">
        <Col lg={5} className="itemInner">
          {totalItems.map((item, index) => {
            return (
              <div className="singleItem">
                <div className="itemInnerLeft">
                  <div className="thumb">
                    <img
                      src="/photos/photo1.jpg"
                      className="thumbimg"
                      alt="abc"
                    />
                  </div>
                  <div className="details">
                    <p className="parah">Product Name: Luffy T-shirt </p>
                    <p className="parah">Category: Anime </p>
                    <p className="parah">Style: OVERSIZED </p>
                    <p className="parah">Size: L </p>
                    <p className="parah">Art Placement: Back </p>
                    <p className="parah">Price: $20</p>
                    <QuantitySelector
                      quantity={2}
                      onQuantityChange={handleQuantityChange}
                    />
                  </div>
                </div>
                <div className="itemInnerRight">
                  <span
                    className="favSpan"
                    onClick={() => {
                      setFav(!fav);
                    }}
                  >
                    {fav ? <FaHeart /> : <FaRegHeart />}
                  </span>
                  <span className="favSpan">
                    <ImBin2 />
                  </span>
                </div>{" "}
              </div>
            );
          })}
        </Col>

        <Col lg={3}>
          <h3>Summary</h3>
          <hr />
          <div>Subtotal: $1500</div>

          <div>Shipping Fee:</div>
          <hr />
          <div>Total Price: $1500</div>
        </Col>
      </Row>
    </div>
  );
};

export default MyCart;
