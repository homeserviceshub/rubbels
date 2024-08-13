import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { closeSearchModal } from "../../redux/actions/searchModal";
import CustomButton from "../customBtn";
import { FaSearch } from "react-icons/fa";
import "./modal.css";
import { NavLink, useNavigate } from "react-router-dom";

function SearchModal({ isSearchModalOpen }) {
  const [searching, setSearching] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleClose = () => {
    dispatch(closeSearchModal());
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const filteredResults = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searching.toLowerCase())
      );
      setSearchResults(
        searching === "" ? allProducts.slice(0, 5) : filteredResults
      );
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [searching]);

  return (
    <>
      <Modal size="lg" show={isSearchModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            id="searching"
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   handleSearch();
            // }}
          >
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
              <div className="HeadingProducts">Products</div>
              {searchResults.map((product, index) => (
                <div
                  key={index}
                  className="searchItem"
                  onClick={() => {
                    navigate(`/tshirt/${product._id}`);
                    dispatch(closeSearchModal());
                  }}
                >
                  <div className="searchImgDiv">
                    <img
                      src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
                      className="searchImg"
                      alt={product.name}
                    />
                  </div>
                  <div className="">
                    <div className="searchName">{product.name}</div>
                    <div className="searchPrice">${product.price}</div>
                    <div className="searchPrice">
                      {product.availability === "available"
                        ? "Available"
                        : "Not Available"}
                    </div>
                  </div>
                </div>
              ))}
              {searching === "" && (
                <div
                  className="seeMore mb-3"
                  onClick={() => {
                    navigate("./tshirts");
                    dispatch(closeSearchModal());
                  }}
                >
                  See All
                </div>
              )}
              <hr />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            text={"Close"}
            width={"auto"}
            height={"auto"}
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SearchModal;
