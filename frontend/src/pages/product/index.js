import React, { useEffect, useState } from "react";
import "./product.css";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import MutipleSlidesPerView from "../../components/cardSlider";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CustomButton from "../../components/customBtn";
import { useDispatch, useSelector } from "react-redux";
import { AddToBag } from "../../redux/actions/addToBag";
import axios from "axios";
import { SelectedProduct } from "../../redux/actions/selectedProduct";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedArt, setSelectedArt] = useState(null);
  const [showSmallCart, setShowSmallCart] = useState(false);
  const [fav, setFav] = useState(false);
  const test = [1, 2, 3, 4, 5, 6];
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  const navigate = useNavigate();

  const selectedproduct = useSelector((state) => state.selectedProductReducer);
  const [selectedProduct, setSelectedProduct] = useState([selectedproduct]);

  const dispatch = useDispatch();
  console.log(selectedProduct);
  // useEffect(() => {
  //   const product = localStorage.getItem("selectedproduct");
  //   if (selectedproduct) {
  //     setSelectedProduct(selectedproduct);
  //   } else if (product && product !== null && product !== "null") {
  //     setSelectedProduct(product);
  //   } else {
  //     navigate("/tshirts");
  //   }
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
    // const product = localStorage.getItem("selectedproduct");
    // product !== "null" && console.log(product, "product hega aa");
    // if (product && product !== null && product !== "null") {
    //   setSelectedProduct([product]);
    //   dispatch(SelectedProduct(product));
    // } else {
    //   navigate("/tshirts");
    // }
  }, []);
  const [allProducts, setAllProducts] = useState();
  console.log(allProducts);

  // const data1 = useSelector((state) => {
  //   return state.addToBagReducer;
  // });
  // useEffect(() => {
  //   setShowSmallCart(data1);
  // }, [data1]);
  // console.log(showSmallCart);
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(AddToBag(false));
  //   }, 1000);
  // }, [showSmallCart]);
  const addItemToBag = () => {
    dispatch(AddToBag(true));
    setTimeout(() => {
      dispatch(AddToBag(false));
    }, 3000);
  };

  return (
    <div className="containerX">
      <Container>
        {selectedProduct &&
          selectedProduct?.map((item, index) => {
            return (
              <Row key={index}>
                <Col lg={7} className="allPhotos">
                  <div className="thumbnails">
                    {test.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`thumbnail ${
                            activeThumbnail === index ? "hovered" : ""
                          }`}
                          onMouseEnter={() => setActiveThumbnail(index)}
                        >
                          <img
                            src="./photos/photo1.jpg"
                            className="allImages"
                            alt="abc"
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="mainImgDiv">
                    {test.map((item, index) => {
                      return (
                        <img
                          key={index}
                          src="./photos/photo1.jpg"
                          className={`allImages ${
                            activeThumbnail === index ? "showImg" : "hideImg"
                          }`}
                          alt="abc"
                        />
                      );
                    })}
                  </div>
                </Col>
                <Col className="rightRail">
                  <div>
                    <div className="productNameDiv">
                      <h3 className="mb-0">{item.name}</h3>
                      <span
                        className="favSpan"
                        onClick={() => {
                          setFav(!fav);
                        }}
                      >
                        {fav ? <FaHeart /> : <FaRegHeart />}
                      </span>
                    </div>

                    <h5 className="bold">
                      {item.productcollection} Collection
                    </h5>
                    <p className="mt-4 bold">Price: ${item.price}</p>
                  </div>
                  <div className="sizeDiv mt-4">
                    <h4 className="selectSize">Select Size</h4>
                    <div className="allsize mt-3">
                      {Object.keys(item.size).map((item, index) => {
                        return (
                          <span
                            key={index}
                            className={`size ${
                              selectedSize === item ? "selectedSize" : ""
                            }`}
                            onClick={() => {
                              setSelectedSize(item);
                            }}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="sizeDiv mt-4">
                    <h4 className="selectSize">Select Style</h4>
                    <div className="allsize mt-3">
                      {Object.entries(item.style).map((item, index) => {
                        if (item[1] === "yes") {
                          return (
                            <span
                              onClick={() => {
                                setSelectedStyle(item[0]);
                              }}
                              className={`selectOption ${
                                selectedStyle === item[0] ? "selectedSize" : ""
                              }`}
                            >
                              {item[0]}
                            </span>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="sizeDiv mt-4">
                    <h4 className="selectSize">Select Art Placement</h4>
                    <div className="allsize mt-3">
                      {Object.entries(item.artplacement).map((item, index) => {
                        if (item[1] === "yes") {
                          return (
                            <span
                              onClick={() => {
                                setSelectedArt(item[0]);
                              }}
                              className={`selectOption ${
                                selectedArt === item[0] ? "selectedSize" : ""
                              }`}
                            >
                              {item[0]}
                            </span>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="mt-4 productBtnDiv">
                    <CustomButton
                      text={"Add to Cart"}
                      customClass="newcustom"
                      onClick={addItemToBag}
                    />
                    <CustomButton text={"Buy Now"} customClass="newcustom" />
                  </div>
                  <div>
                    <Accordion
                      defaultActiveKey={["0"]}
                      alwaysOpen
                      className="pt-4 mt-5"
                    >
                      <Accordion.Item
                        className="customeaccordion1"
                        eventKey="0"
                      >
                        <Accordion.Header>Discription</Accordion.Header>
                        <Accordion.Body>
                          <div className="">{item.discription}</div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item className="customeaccordion" eventKey="1">
                        <Accordion.Header>Detail</Accordion.Header>
                        <Accordion.Body>
                          <ol className="">
                            {item.details.map((list, i) => {
                              return <li key={i}> {list}</li>;
                            })}
                            <li>100% Cotton Weight - 280 GSM</li>
                            <li> Puff Print </li>
                            <li>Reverse Wash only</li>
                          </ol>
                          ALL SALES ARE FINAL. NO CANCELLATIONS, EXCHANGES OR
                          RETURNS ARE PERMITTED WITH PlayboyxBLUORNG.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Col>
              </Row>
            );
          })}
      </Container>
      <div className="similar m-5">
        <h3 className="similarHeading mb-5">You may also like</h3>
        {allProducts && <MutipleSlidesPerView products={allProducts} />}
      </div>
    </div>
  );
};

export default Product;
