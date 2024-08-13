import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useParams } from "react-router-dom";
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
import QuantitySelector from "../../components/quantitySelector/quantitySelector";
import Checkout from "../checkout";
import MySpinner from "../../components/spinner/spinner";

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [fav, setFav] = useState(false);
  const test = [1, 2, 3, 4, 5, 6];
  const size = ["S", "M", "L", "XL", "XXL"];
  const navigate = useNavigate();
  const product = localStorage.getItem("selectedproduct");
  // console.log(product, "jsdjksdjhskj");
  const selectedproduct = useSelector((state) => state.selectedProductReducer);
  const [selectedProduct, setSelectedProduct] = useState([JSON.parse(product)]);
  const [productID, setProductID] = useState(selectedProduct[0]._id);
  const [productFullData, setproductFullData] = useState();
  const [selectedDetails, setSelectedDetails] = useState({
    id: id,
    name: selectedProduct[0].name,
    collection: selectedProduct[0].productcollection,
    selectedArt: "",
    selectedSize: "",
    selectedStyle: "",
    price: selectedProduct[0].price,
    quantity: 1,
  });
  useEffect(() => {
    setSelectedDetails({
      ...selectedDetails,
      name: JSON.parse(product).name,
      collection: JSON.parse(product).productcollection,
      id: JSON.parse(product)._id,
    });
  }, [product]);

  const updatedSelectedDetails = (name, value) => {
    setSelectedDetails({ ...selectedDetails, [name]: value });
  };
  const handleQuantityChange = (newQuantity) => {
    setSelectedDetails({ ...selectedDetails, quantity: newQuantity });
  };

  // console.log(selectedDetails, "selectedDetails");
  // console.log(productFullData?.data, "productFullData");
  // console.log(selectedProduct, "selected");

  // console.log(JSON.parse(product), "local data");
  const dispatch = useDispatch();
  // console.log(selectedProduct, "redux data");
  useEffect(() => {
    setIsLoading(true);
    if (id) {
      axios
        .post("http://localhost:8000/selectedproductdata", {
          id: id,
        })
        .then((response) => {
          if (response.status === 200) {
            setproductFullData(response);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
          console.log(error);
        });
    }
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    // Fetch favorites from localStorage
    const favorites = localStorage.getItem("favorites");

    // Check if the current productID exists in favorites
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      if (parsedFavorites.includes(productID)) {
        setFav(true);
      }
    }
  }, [productID]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        setAllProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/newproductlist")
      .then((res) => {
        setNewProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const [allProducts, setAllProducts] = useState();
  const [newProducts, setNewProducts] = useState();

  const capitalizeWords = (str) => {
    return str;
    // .toLowerCase()
    // .split(" ")
    // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    // .join(" ");
  };
  const handleSave = () => {
    // Check if favorites exist in localStorage
    let favorites = localStorage.getItem("favorites");

    // If favorites doesn't exist, create a new array with the new data
    if (!favorites) {
      favorites = [productID];
    } else {
      // If favorites exist, parse the stored data and add the new data to it
      favorites = JSON.parse(favorites);
      if (!favorites.includes(productID)) {
        favorites.push(productID);
        // Save the updated favorites back to localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        console.log("Product already exists in favorites!");
      }
    }

    // Save the updated favorites back to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  const handleFavRemove = () => {
    let favorites = localStorage.getItem("favorites");

    if (favorites) {
      favorites = JSON.parse(favorites);

      const index = favorites.indexOf(productID);
      if (index !== -1) {
        favorites.splice(index, 1); // Remove the item from favorites array

        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log(`Product ID ${productID} removed from favorites.`);
      } else {
        console.log(`Product ID ${productID} not found in favorites.`);
      }
    } else {
      console.log("No favorites found.");
    }
  };
  const addItemToBag = (productData, showSmallCartValue) => {
    if (
      selectedDetails.selectedArt === "" ||
      selectedDetails.selectedSize === "" ||
      selectedDetails.selectedStyle === ""
    ) {
      alert("Please select all options");
    } else {
      let cart = localStorage.getItem("mycart");

      if (!cart) {
        cart = [];
      } else {
        cart = JSON.parse(cart);
      }

      const existsInCart = cart.some((item) => {
        return (
          item.id === productData.id &&
          item.collection === productData.collection &&
          item.selectedArt === productData.selectedArt &&
          item.selectedSize === productData.selectedSize &&
          item.selectedStyle === productData.selectedStyle
        );
      });

      if (!existsInCart) {
        cart.push(productData);
        localStorage.setItem("mycart", JSON.stringify(cart));
        dispatch(AddToBag({ productData, showSmallCartValue }));
        setTimeout(() => {
          dispatch(AddToBag(false)); // Or handle this logic as needed
        }, 4000);
      } else {
        alert("Product already exists in cart");
      }
    }

    console.log();
  };
  const directCheckout = (productData) => {
    if (
      selectedDetails.selectedArt === "" ||
      selectedDetails.selectedSize === "" ||
      selectedDetails.selectedStyle === ""
    ) {
      alert("Please select all options");
    } else {
      const selectedDetails = JSON.parse(
        localStorage.getItem("selectedDetails")
      );

      if (selectedDetails) {
        // Replace selectedDetails with productData
        localStorage.setItem("selectedDetails", JSON.stringify(productData));
      } else {
        // Set productData in selectedDetails
        localStorage.setItem("selectedDetails", JSON.stringify(productData));
      }
      navigate(`/checkout/${productFullData.data._id}`);
    }
  };

  return (
    //
    <>
      {isLoading ? (
        <MySpinner />
      ) : (
        <div className="containerX">
          <Container>
            {productFullData && (
              <Row>
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
                            src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
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
                          src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
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
                      <h3 className="mb-0">{productFullData.data.name}</h3>
                      <span className="favSpan" onClick={() => setFav(!fav)}>
                        {fav ? (
                          <FaHeart
                            onClick={() => {
                              handleFavRemove();
                            }}
                          />
                        ) : (
                          <FaRegHeart onClick={() => handleSave()} />
                        )}
                      </span>
                    </div>

                    <h5 className="bold">
                      {productFullData.data.productcollection} Collection
                    </h5>
                    <p className="mt-4 bold">
                      Price: ${productFullData.data.price}
                    </p>
                  </div>
                  <div className="sizeDiv mt-4">
                    <h4 className="selectSize">Select Size</h4>
                    <div className="allsize mt-3">
                      {Object.entries(productFullData.data.size).map(
                        (item, index) => {
                          return (
                            <span
                              key={index}
                              className={`size ${
                                item[1] == 0 && "notAvailable"
                              } ${
                                selectedDetails.selectedSize === item[0]
                                  ? "selectedSize"
                                  : ""
                              }`}
                              onClick={() => {
                                if (item[1] !== "0") {
                                  console.log(item[1], "ddd");
                                  return updatedSelectedDetails(
                                    "selectedSize",
                                    item[0]
                                  );
                                }
                              }}
                            >
                              {item[0].toUpperCase()}
                            </span>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <div className="sizeDiv mt-4">
                    <h4 className="selectSize">Select Style</h4>
                    <div className="allsize mt-3">
                      {Object.entries(productFullData.data.style).map(
                        (item, index) => {
                          if (item[1] === "yes") {
                            return (
                              <span
                                key={index}
                                className={` selectOption ${
                                  selectedDetails.selectedStyle === item[0]
                                    ? "selectedSize"
                                    : ""
                                }`}
                                onClick={() => {
                                  updatedSelectedDetails(
                                    "selectedStyle",
                                    item[0]
                                  );
                                }}
                              >
                                {item[0].toUpperCase()}
                              </span>
                            );
                          }
                        }
                      )}
                    </div>
                  </div>
                  <div className="sizeDiv mt-4">
                    <h4 className="selectSize">Select Art Placement</h4>
                    <div className="allsize mt-3">
                      {Object.entries(productFullData.data.artplacement).map(
                        (item, index) => {
                          if (item[1] === "yes") {
                            return (
                              <span
                                key={index}
                                className={`selectOption ${
                                  selectedDetails.selectedArt === item[0]
                                    ? "selectedSize"
                                    : ""
                                }`}
                                onClick={() => {
                                  updatedSelectedDetails(
                                    "selectedArt",
                                    item[0]
                                  );
                                }}
                              >
                                {item[0].toUpperCase()}
                              </span>
                            );
                          }
                        }
                      )}
                    </div>
                  </div>
                  <div className="sizeDiv mt-4">
                    <h4 className="selectSize">Number of Items</h4>
                    <div className="allsize mt-3">
                      <QuantitySelector
                        quantity={selectedDetails.quantity}
                        onQuantityChange={handleQuantityChange}
                      />
                    </div>
                  </div>
                  <div className="mt-4 productBtnDiv">
                    <CustomButton
                      text={"Add to Cart"}
                      customClass="newcustom"
                      onClick={() => addItemToBag(selectedDetails, true)}
                    />
                    <CustomButton
                      text={"Buy Now"}
                      onClick={() => {
                        directCheckout(selectedDetails);
                      }}
                      customClass="newcustom"
                    />
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
                          <div className="">
                            {productFullData.data.discription}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item className="customeaccordion" eventKey="1">
                        <Accordion.Header>Detail</Accordion.Header>
                        <Accordion.Body>
                          <ol className="">
                            {console.log(productFullData.data.details)}
                            {/* {
                              (detailsArray = productFullData.data.details
                                ? productFullData.data.details.split(/[\n,]/)
                                : [])
                            } */}
                            {productFullData.data.details.map((list, i) => {
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
            )}
          </Container>
          <div className="similar m-5">
            <h3 className="similarHeading mb-5">You may also like</h3>
            {newProducts && <MutipleSlidesPerView products={newProducts} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
