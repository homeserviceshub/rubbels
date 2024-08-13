import React from "react";
import "./orders.css";
import { Col, Row } from "react-bootstrap";

const Orders = () => {
  return (
    <div>
      <div className="profiletitle">Your Orders</div>
      <div className="orderContainer mt-4">
        <div className="orderBox">
          <div>
            <img
              src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
              height={"100px"}
              width={"100px"}
              alt="Order"
              className="border10"
            />
          </div>

          <div>
            <div>name : Madara Uchiha</div>
            <div>Payment Method : COD </div>
            <div>Status : On the way </div>
            <div>Size : L </div>
          </div>
          <div>
            <div>Style : Oversized </div>
            <div>Art Placement : Back </div>

            <div>OrderID : 64de855cd1f431c586924c82</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
