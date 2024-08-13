import React, { useRef, useState } from "react";
import axios from "axios";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [productData, setproductData] = useState({
    productName: "",
    productCollection: "",
    price: "",
    size: {
      S: "0",
      M: "0",
      L: "0",
      XL: "0",
      XXL: "0",
    },
    style: { regular: "yes", oversized: "yes" },
    artplacement: {
      back: "yes",
      front: "yes",
    },
    discription: "",
    details: "",
    mediaFiles: [],
    availability: "available",
    addingdate: new Date(),
    gender: "male",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproductData({
      ...productData,
      [name]: value,
    });
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
  const handleDeleteMedia = (path) => {
    setproductData((prevProductData) => ({
      ...prevProductData,
      mediaFiles: prevProductData.mediaFiles.filter(
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
      mediaFiles: [...prevProductData.mediaFiles, ...mediaArray],
    }));
  };

  const saveProduct = async () => {
    console.log(productData);
    if (
      productData.addingdate &&
      productData.artplacement &&
      productData.availability &&
      productData.details &&
      productData.discription &&
      productData.gender &&
      productData.mediaFiles &&
      productData.price &&
      productData.productCollection &&
      productData.productName &&
      productData.size &&
      productData.style
    ) {
      try {
        // setIsLoading(true);
        await axios
          .post("http://localhost:8000/addproduct", {
            addingdate: productData.addingdate,
            artplacement: productData.artplacement,
            availability: productData.availability,
            details: productData.details,
            discription: productData.discription,
            gender: productData.gender,
            mediaFiles: productData.mediaFiles,
            price: productData.price,
            productCollection: productData.productCollection,
            productName: productData.productName,
            size: productData.size,
            style: productData.style,
          })
          .then((response) => {
            if (response.status === 200) {
              // setIsLoading(false);
              console.log(response.data);
              alert("Successfully added");
              navigate(-1);
            }
          })
          .catch((error) => {
            console.error("AxiosError:", error);
            console.log(error);
          });
      } catch (error) {
        console.error("Error no product added:", error);
      }
    }
  };

  return (
    <Container className="containerX">
      <Row className=" mx-0 my-4">
        <h2>Add New Product Data</h2>
        <Col lg={12} className=" mb-3  py-3">
          <div className="adminAllMedia align-items-center">
            {Array.isArray(productData.mediaFiles) &&
              productData?.mediaFiles.map((media, index) => (
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

          <Row className="">
            <Col lg={6}>
              <FloatingLabel label="Proudct Name" className="mt-3">
                <Form.Control
                  onChange={handleInputChange}
                  name="productName"
                  type="text"
                  className="formField"
                  placeholder="Product Name"
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
                  value={new Date()}
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
            <div className="allsize">
              {Object.entries(productData.size).map(
                ([sizeKey, sizeValue], index) => (
                  <span key={index} className="singlesize">
                    <span>{sizeKey}</span>:
                    <input
                      type="number"
                      className="sizeinput formField"
                      value={sizeValue}
                      onChange={(event) => handleSizeChange(sizeKey, event)}
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
                    onChange={(event) => handleStyleChange(styleKey, event)}
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
              />
            </FloatingLabel>
          </div>
        </Col>
        <Col className="d-flex justify-content-end">
          <CustomButton
            width={"auto"}
            text={"Add Product"}
            onClick={saveProduct}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
