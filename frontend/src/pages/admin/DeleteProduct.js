import React, { useEffect, useState } from "react";
import MySpinner from "../../components/spinner/spinner";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DeleteProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searching, setSearching] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = localStorage.getItem("mycart");
    const favs = localStorage.getItem("favorites");
    const selectedproduct = localStorage.getItem("selectedproduct");

    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart);
    }
    if (favs) {
      const parsedFavs = JSON.parse(favs);
      setFavorites(parsedFavs);
    }
    if (selectedproduct) {
      const selectedproductt = JSON.parse(selectedproduct);
      setSelectedProduct(selectedproductt);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        const sortedProducts = res?.data.data.sort((a, b) => {
          return Date.parse(b.addingdate) - Date.parse(a.addingdate); // Sort by recent time added
        });
        setAllProducts(sortedProducts);
        setSearchResults(sortedProducts.slice(0, 5)); //initial product data
        setAllProducts(res?.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const filteredResults = allProducts?.data?.filter((product) =>
        product.name.toLowerCase().includes(searching.toLowerCase())
      );
      setSearchResults(
        searching === "" ? allProducts?.data?.slice(0, 5) : filteredResults
      );
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [searching]);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        setAllProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const DeleteProduct = async (productData) => {
    console.log(productData);
    await axios
      .post("http://localhost:8000/deleteproduct", productData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);

          // // Filter out the deleted product from cartItems
          // const updatedCart = cartItems.filter(
          //   (item) => item.id !== productData.id
          // );
          // setCartItems(updatedCart);
          // localStorage.setItem("mycart", JSON.stringify(updatedCart));

          // // Filter out the deleted product from favorites
          // const updatedFavorites = favorites.filter(
          //   (item) => item !== productData.id
          // );
          // setFavorites(updatedFavorites);
          // localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

          // // Assuming selectedProduct has an _id field
          // // const updatedSelectedProduct = selectedProduct.filter(
          // //   (item) => item._id !== productData.id
          // // );
          // if (selectedProduct._id === productData.id) {
          //   localStorage.setItem("selectedproduct", "");
          // }

          alert("Successfully Deleted");
          navigate("/letmemakesomechangesinwebsite");
        }
      })
      .catch((error) => {
        console.error("AxiosError:", error);
        console.log(error);
      });
  };
  return (
    <div className="containerX">
      {isLoading ? (
        <MySpinner />
      ) : (
        <Container className="p-0 mb-4">
          <form id="searching">
            <div className="SearchDiv">
              <input
                className="customSearch"
                type="text"
                placeholder="Search Here..."
                value={searching}
                onChange={(e) => {
                  setSearching(e.target.value);
                }}
              />
              <FaSearch className="searchIcon" type="submit" />
            </div>
            {/* Display search results */}
            <div className="SearchProducts">
              {searchResults ? (
                searchResults.map((product, index) => (
                  <div
                    key={index}
                    className="searchItem hover justify-content-between align-items-center p-2"
                  >
                    <div className="d-flex checkdiv ">
                      <div className="searchImgDiv">
                        <img
                          src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
                          className="searchImg"
                          alt={product.name}
                        />
                      </div>
                      <div className="">
                        <div className="searchName">{product.name}</div>
                        <div className="searchPrice">
                          {product.productcollection}
                        </div>
                        <div className="searchPrice">
                          {product.availability === "available"
                            ? "Available"
                            : "Not Available"}
                        </div>
                      </div>
                    </div>
                    <CustomButton
                      disabled={isSubmitting}
                      onClick={() => {
                        DeleteProduct(product);
                      }}
                      width="auto"
                      customClass="mx-3"
                      text={
                        isSubmitting ? (
                          <Spinner animation="border" />
                        ) : (
                          "Delete Product"
                        )
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="mt-3">No product Found</div>
              )}

              <hr />
            </div>
          </form>
        </Container>
      )}
    </div>
  );
};

export default DeleteProduct;
