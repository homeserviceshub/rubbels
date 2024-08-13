import React, { useEffect, useRef, useState } from "react";
import MySpinner from "../../components/spinner/spinner";
import axios from "axios";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AlterProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searching, setSearching] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [productSelected, setProductSelected] = useState();

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [productData, setproductData] = useState({
    productName: "",
    productCollection: "",
    price: "",
    size: "",
    style: "",
    artplacement: "",
    discription: "",
    details: "",
    mediafiles: "",
    availability: "",
    addingdate: "",
    id: "",
    gender: "",
  });
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproductData({
      ...productData,
      [name]: value,
    });
  };

  const handleDeleteMedia = (path) => {
    setproductData((prevProductData) => ({
      ...prevProductData,
      mediafiles: prevProductData.mediafiles.filter(
        (media) => media.path !== path
      ),
    }));
  };
  const handleMediaChange = async (event) => {
    const selectedMedia = event.target.files;
    var mediaArray = [];

    const formData = new FormData();
    formData.append("media", selectedMedia[0]);
    try {
      await axios
        .post("http://localhost:8000/upload", formData)
        .then((response) => {
          if (response.status === 200) {
            // console.log(Object.values(response.data)[0].filename);
            const mediaObject = {
              path: Object.values(response.data)[0].filename,
              type: selectedMedia[0].type.startsWith("image")
                ? "image"
                : "video",
            };

            mediaArray.push(mediaObject);
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
          console.log(error);
        });
      // Check the response from the server
      // Handle the response as needed
    } catch (error) {
      console.error("Error uploading media:", error);
    }

    setproductData((prevProductData) => ({
      ...prevProductData,
      mediafiles: [...prevProductData.mediafiles, ...mediaArray],
    }));
  };

  const handleSizeChange = (sizeKey, event) => {
    const newSizeValue = event.target.value;

    setproductData((prevProductData) => ({
      ...prevProductData,
      size: {
        ...prevProductData.size,
        [sizeKey]: newSizeValue,
      },
    }));
  };
  const handleArtPlacementChange = (placementKey, event) => {
    const newPlacementValue = event.target.checked ? "yes" : "no";

    setproductData((prevProductData) => ({
      ...prevProductData,
      artplacement: {
        ...prevProductData.artplacement,
        [placementKey]: newPlacementValue,
      },
    }));
  };

  const handleStyleChange = (styleKey, event) => {
    const newStyleValue = event.target.checked ? "yes" : "no";

    setproductData((prevProductData) => ({
      ...prevProductData,
      style: {
        ...prevProductData.style,
        [styleKey]: newStyleValue,
      },
    }));
  };
  const saveProduct = async () => {
    console.log(productData);
    await axios
      .post("http://localhost:8000/alterproduct", productData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          alert("Successfully Altered");
          navigate(-1);
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
        <>
          {productSelected ? (
            <Container className="containerX">
              <Row className=" mx-0 my-4">
                <h2>Alter Product Data</h2>
                <Col lg={12} className=" mb-3  py-3">
                  <div className="adminAllMedia align-items-center">
                    {Array.isArray(productData.mediafiles) &&
                      productData?.mediafiles.map((media, index) => (
                        <span key={index} className="d-flex position-relative">
                          <span
                            className="deleteMedia"
                            onClick={() => handleDeleteMedia(media.path)}
                          >
                            X
                          </span>
                          {media.type === "image" ? (
                            <img
                              className="adminProductMedia"
                              src={`http://localhost:8000/images/${media.path}`} // Update the URL accordingly
                              alt={`media-${index}`}
                              width={"90px"}
                              height={"90px"}
                            />
                          ) : (
                            <video
                              className="adminProductMedia"
                              src={`http://localhost:8000/images/${media.path}`} // Update the URL accordingly
                              width={"90px"}
                              height={"90px"}
                              controls
                              alt={`media-${index}`}
                            />
                          )}
                        </span>
                      ))}
                    <label htmlFor="mediaInput">
                      <input
                        type="file"
                        id="mediaInput"
                        ref={fileInputRef}
                        accept="image/*, video/*"
                        onChange={handleMediaChange}
                      />
                    </label>
                  </div>
                  <FloatingLabel label="Product ID" className="mt-3">
                    <Form.Control
                      name="productid"
                      type="text"
                      className="formField"
                      placeholder="Product ID"
                      value={productData.id}
                      disabled
                    />
                  </FloatingLabel>
                  <Row className="">
                    <Col lg={6}>
                      <FloatingLabel label="Proudct Name" className="mt-3">
                        <Form.Control
                          onChange={handleInputChange}
                          name="productName"
                          type="text"
                          className="formField"
                          placeholder="Product Name"
                          value={productData.productName}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel label="Collection Name" className="mt-3">
                        <Form.Control
                          onChange={handleInputChange}
                          name="productCollection"
                          type="text"
                          className="formField"
                          placeholder="Collection Name"
                          value={productData.productCollection}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Row className="">
                    <Col lg={6}>
                      <FloatingLabel label="Price" className="mt-3">
                        <Form.Control
                          onChange={handleInputChange}
                          name="price"
                          type="text"
                          className="formField"
                          placeholder="Price"
                          value={productData.price}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={6}>
                      <FloatingLabel label="Adding Date" className="mt-3">
                        <Form.Control
                          name="addingdate"
                          type="text"
                          className="formField"
                          placeholder="Adding Date"
                          value={productData.addingdate}
                          disabled
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="">
                    <Col lg={6}>
                      <div className="mt-3 pb-3 h-100 ">
                        <Form.Select
                          className="formField  h-100"
                          variant="outline-secondary"
                          id="Availability"
                          name="availability"
                          onChange={handleInputChange}
                          value={productData.availability}
                        >
                          <option value="available" className="">
                            Available
                          </option>
                          <option value="notavailable" className="">
                            Not Available
                          </option>
                        </Form.Select>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mt-3 pb-3 h-100 ">
                        <Form.Select
                          className="formField  h-100"
                          variant="outline-secondary"
                          id="gender"
                          name="gender"
                          onChange={handleInputChange}
                          value={productData.gender}
                        >
                          <option value="male" className="">
                            male
                          </option>
                          <option value="female" className="">
                            female
                          </option>
                          <option value="unisex" className="">
                            unisex
                          </option>
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <div>
                      <h3 className="mb-2 mt-4">Sizes:</h3>
                    </div>
                    {console.log(productData)}
                    <div className="allsize">
                      {Object.entries(productData.size).map(
                        ([sizeKey, sizeValue], index) => (
                          <span key={index} className="singlesize">
                            <span>{sizeKey}</span>:
                            <input
                              type="number"
                              className="sizeinput formField"
                              value={sizeValue}
                              onChange={(event) =>
                                handleSizeChange(sizeKey, event)
                              }
                            />
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="d-flex pt-4 checkdiv">
                    <h3 className="m-0">Art Placement:</h3>
                    {Object.entries(productData.artplacement).map(
                      ([placementKey, placementValue], index) => (
                        <span key={index} className="filterType">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`art-${placementKey}`}
                            name="artplacement"
                            checked={placementValue === "no" ? false : true}
                            onChange={(event) =>
                              handleArtPlacementChange(placementKey, event)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`art-${placementKey}`}
                          >
                            {placementKey}
                          </label>
                        </span>
                      )
                    )}
                  </div>
                  <div className="d-flex pt-4 checkdiv">
                    <h3 className="m-0">Style:</h3>
                    {Object.entries(productData.style).map(
                      ([styleKey, styleValue], index) => (
                        <span key={index} className="filterType">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`style-${styleKey}`}
                            name="style"
                            checked={styleValue === "no" ? false : true}
                            onChange={(event) =>
                              handleStyleChange(styleKey, event)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`style-${styleKey}`}
                          >
                            {styleKey}
                          </label>
                        </span>
                      )
                    )}
                  </div>
                  <div className="mt-3">
                    <h3>Discription</h3>
                    <FloatingLabel label="Discription" className="mt-3">
                      <Form.Control
                        name="discription"
                        onChange={handleInputChange}
                        as="textarea"
                        className="h-100 formField"
                        rows={3}
                        value={productData.discription}
                      />
                    </FloatingLabel>
                  </div>
                  <div className="mt-3">
                    <h3>Details</h3>
                    <FloatingLabel label="Details" className="mt-3">
                      <Form.Control
                        name="details"
                        onChange={handleInputChange}
                        as="textarea"
                        className="h-100 formField"
                        rows={3}
                        value={productData.details}
                      />
                    </FloatingLabel>
                  </div>
                </Col>
                <Col className="d-flex justify-content-end">
                  <CustomButton
                    width={"auto"}
                    text={"Save Changes"}
                    onClick={saveProduct}
                  />
                </Col>
              </Row>
            </Container>
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
                  {searchResults.length > 0 ? (
                    searchResults.map((product, index) => (
                      <div
                        key={index}
                        onClick={(e) => {
                          console.log(product, "ethe canada");
                          setProductSelected(product);
                          setproductData({
                            productName: product.name,
                            productCollection: product.productcollection,
                            price: product.price,
                            size: product.size,
                            style: product.style,
                            artplacement: product.artplacement,
                            discription: product.discription,
                            details: product.details,
                            mediafiles: product.mediafiles,
                            availability: product.availability,
                            addingdate: product.addingdate,
                            id: product._id,
                            gender: product.gender,
                          });
                        }}
                        className="searchItem hover"
                      >
                        {/* Display product details */}

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
                    ))
                  ) : (
                    <div className="mt-3">No product Found</div>
                  )}

                  <hr />
                </div>
              </form>
            </Container>
          )}
        </>
      )}
    </div>
  );
};

export default AlterProduct;
