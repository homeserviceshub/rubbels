import React, { useEffect, useState } from "react";
import "./favourites.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import MySpinner from "../../components/spinner/spinner";

const Favourites = () => {
  const favorites = localStorage.getItem("favorites");
  const [favData, setFavData] = useState(JSON.parse(favorites));
  const [favFullData, setFavFullData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if (favorites) {
      axios
        .post("http://localhost:8000/favData", {
          favData: favData,
        })
        .then((response) => {
          if (response.status === 200) {
            setFavFullData(response);
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleFavRemove = (productID) => {
    let favorites = localStorage.getItem("favorites");
    const updatedProducts = favData.filter((product) => product !== productID);
    console.log(favData, "fdc");
    setFavData(updatedProducts);
    axios
      .post("http://localhost:8000/favdata", {
        favData: favData,
      })
      .then((response) => {
        if (response.status === 200) {
          setFavFullData(response);
        }
      })
      .catch((error) => {
        console.error("AxiosError:", error);
        console.log(error);
      });
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
  return (
    <div className="containerX containerZ">
      {isLoading ? (
        <MySpinner />
      ) : (
        <Row className="AddedItem">
          <Col lg={7} className="itemInner">
            {favFullData?.data.message === "No Products Found" ? (
              <div className="thankyouContainer">
                <h1>No Favourite Items Yet!</h1>
              </div>
            ) : (
              <>
                <h3 className="m-0">FAVOURITES</h3>
                <hr className="m-0" />
                {favFullData?.data.map((item, index) => {
                  return (
                    <>
                      <div key={index} className="singleItem">
                        <div className="itemInnerLeft">
                          <div className="thumb">
                            <img
                              src={
                                process.env.PUBLIC_URL + "/photos/photo1.jpg"
                              }
                              className="thumbimg"
                              alt="abc"
                            />
                          </div>
                          <div className="details">
                            <p className="parah">Product Name: {item.name} </p>
                            <p className="parah">
                              Category: {item.productcollection}{" "}
                            </p>
                            <p className="parah">Price: ${item.price}</p>
                          </div>
                        </div>
                        <div className="itemInnerRight">
                          <span className="favSpan">
                            <ImBin2
                              onClick={() => {
                                handleFavRemove(item._id);
                              }}
                            />
                          </span>
                        </div>
                      </div>
                      <hr className="m-0" />
                    </>
                  );
                })}
              </>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Favourites;
