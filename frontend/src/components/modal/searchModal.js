import { useDispatch, useSelector } from "react-redux";
import { closeSearchModal } from "../../redux/actions/searchModal";
import { Button, Modal } from "react-bootstrap";
import CustomButton from "../customBtn";
import { FaSearch } from "react-icons/fa";
import "./modal.css";
import { useState } from "react";
import { Form } from "react-router-dom";

function SearchModal({ isSearchModalOpen }) {
  const [searching, setSearching] = useState();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSearchModal());
  };
  const showSearching = () => {
    console.log(searching);
  };

  return (
    <>
      <Modal size="lg" show={isSearchModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="searching" onSubmit={showSearching}>
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
              <FaSearch
                className="searchIcon"
                type="submit"
                onClick={showSearching}
              />
            </div>
            <div className="SearchProducts">
              <div className="HeadingProducts">Products</div>
              {/* {items.map((item,index)=>{return ()})} */}
              <div className="searchItem">
                <div className="searchImgDiv">
                  <img src="./photos/photo1.jpg" className="searchImg" />
                </div>
                <div className="">
                  <div className="searchName">T-Shirt name</div>
                  <div className="searchPrice"> Price </div>
                  <div className="searchPrice"> Available </div>
                </div>
              </div>
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
          <CustomButton
            text={"Search"}
            width={"auto"}
            height={"auto"}
            onClick={showSearching}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SearchModal;
