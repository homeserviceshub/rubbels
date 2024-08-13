import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./myCart.css";
import QuantitySelector from "../../components/quantitySelector/quantitySelector";
import { ImBin2 } from "react-icons/im";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CustomButton from "../../components/customBtn";
import { useNavigate } from "react-router-dom";
import MySpinner from "../../components/spinner/spinner";

const MyCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const cart = localStorage.getItem("mycart");
    const favs = localStorage.getItem("favorites");

    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);
    }
    if (favs) {
      const parsedFavs = JSON.parse(favs);
      setFavorites(parsedFavs);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const calculateSubtotal = () => {
    let subtotal = 0;
    let totalProducts = 0;

    cartItems.forEach((item) => {
      subtotal += parseFloat(item.price) * item.quantity;
      totalProducts += item.quantity;
    });

    return { subtotal, totalProducts };
  };
  const { subtotal, totalProducts } = calculateSubtotal();
  const shippingFee = 50 * totalProducts;
  const total = subtotal + shippingFee;

  const handleQuantityChange = (newQuantity, index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
    localStorage.setItem("mycart", JSON.stringify(updatedItems));
  };
  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("mycart", JSON.stringify(updatedCart));
  };
  const handleFavoriteToggle = (productId) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      {isLoading ? (
        <MySpinner />
      ) : (
        <div className="containerX containerZ">
          <h3 className="cartheading">CART</h3>
          {cartItems && cartItems.length > 0 ? (
            <Row className="AddedItem">
              <Col lg={5} className="itemInner">
                {cartItems.map((item, index) => (
                  <div className="singleItem" key={index}>
                    <div className="itemInnerLeft">
                      <div className="thumb">
                        <img
                          src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
                          className="thumbimg"
                          alt={item.name}
                        />
                      </div>
                      <div className="details">
                        <p className="parah">Product Name: {item.name}</p>
                        <p className="parah">Category: {item.collection} </p>
                        <p className="parah">Style: {item.selectedStyle} </p>
                        <p className="parah">Size: {item.selectedSize} </p>
                        <p className="parah">
                          Art Placement: {item.selectedArt}{" "}
                        </p>
                        <p className="parah">Price: ${item.price}</p>
                        <QuantitySelector
                          quantity={item.quantity}
                          onQuantityChange={(newQuantity) =>
                            handleQuantityChange(newQuantity, index)
                          }
                        />
                      </div>
                    </div>
                    <div className="itemInnerRight">
                      <span
                        className="favSpan d-flex"
                        onClick={() => handleFavoriteToggle(item.id)}
                      >
                        {favorites.includes(item.id) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}
                      </span>
                      <span className="favSpan d-flex">
                        <ImBin2 onClick={() => handleDeleteItem(index)} />
                      </span>
                    </div>
                  </div>
                ))}
              </Col>
              <Col lg={3} className="pt-3">
                <h3>Summary</h3>
                <hr />
                <div className="mt-3 mb-3">Subtotal: ${subtotal}</div>
                <div className="mt-3 mb-3">Shipping Fee: ${shippingFee}</div>
                <hr />
                <div className="mt-3 mb-3">Total Price: ${total}</div>
                <hr />
                <div className="mt-5">
                  <CustomButton
                    text={"Proceed to Checkout"}
                    onClick={() => {
                      navigate("/checkout");
                    }}
                    customClass="newcustomcartbtn"
                  />
                </div>
              </Col>
            </Row>
          ) : (
            <div className="thankyouContainer">
              <h1>No Item Added Yet</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyCart;
