import React, { useEffect, useRef, useState } from "react";
import "./products.css";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { Accordion, Col, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import IconFilter from "../../components/icons/IconFilter";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import MySpinner from "../../components/spinner/spinner";

function AllProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const simpleBarRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [allProducts, setAllProducts] = useState();
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
  useEffect(() => {
    if (simpleBarRef.current) {
      simpleBarRef.current.recalculate();
    }
  }, []);
  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };
  const [filters, setFilters] = useState({
    sort: [
      { newest: false },
      // { topseller: false },
      { "price(high to low)": false },
      { "price(low to high)": false },
    ],
    availability: [{ available: false }, { notavailable: false }],
    size: [
      { S: false },
      { M: false },
      { L: false },
      { XL: false },
      { XXL: false },
      { XXXL: false },
    ],
    gender: [{ male: false }, { female: false }, { unisex: false }],
    categories: [{ anime: false }, { marvels: false }, { dc: false }],
  });

  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    const storedFilters = localStorage.getItem("filters");

    if (allProducts && allProducts.data) {
      const uniqueCollections = [
        ...new Set(allProducts.data.map((item) => item.productcollection)),
      ];

      const updatedCategories = uniqueCollections.reduce((acc, collection) => {
        acc[collection.toLowerCase().replace(/\s+/g, "")] = false;
        return acc;
      }, {});

      const filtersArray = Object.keys(updatedCategories).map((key) => ({
        [key]: updatedCategories[key],
      }));

      const updatedFilters = {
        ...filters,
        categories: filtersArray, // No need for an extra array wrapper here
      };

      const parsedFilters = storedFilters;
      let filteredProducts = allProducts?.data;

      if (JSON.stringify(storedFilters) === '"NEWEST"') {
        let sortedData = [...filteredProducts]; // Use filteredProducts instead of filteredData
        sortedData = sortedData.sort((a, b) => {
          return Date.parse(b.addingdate) - Date.parse(a.addingdate);
        });

        filteredProducts = sortedData;
        updatedFilters.sort[0] = { newest: true };
      } else if (JSON.stringify(storedFilters) === "no filter") {
        // Nothing to do here
      } else {
        updatedFilters.categories = updatedFilters.categories.map(
          (category) => {
            const categoryName = Object.keys(category)[0];
            const isCategoryInFilters = parsedFilters.includes(categoryName);
            return { [categoryName]: isCategoryInFilters };
          }
        );

        const selectedCategory = updatedFilters.categories
          .filter((filter) => Object.values(filter)[0])
          .map((item) => Object.keys(item)[0]);

        if (selectedCategory.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            selectedCategory.includes(product.productcollection)
          );
        }
      }

      setfilteredData(filteredProducts);
      setFilters(updatedFilters);
      console.log(updatedFilters);
      console.log(updatedCategories);
    }
  }, [allProducts, localStorage.getItem("filters")]);

  const [activeKey, setActiveKey] = useState(["0", "1", "2", "3", "4"]); // Make sure the keys are strings

  // Handler function to update the active accordion items
  const handleAccordionChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  console.log(filteredData, "check krs");

  const handleFilter = (group, index) => {
    const updatedFilters = { ...filters };

    // Save filters to local storage
    //  localStorage.setItem('filters', JSON.stringify(updatedFilters));
    if (group === "sort") {
      if (Object.keys(updatedFilters[group][index])[0].includes("price")) {
        updatedFilters[group].forEach((checkbox, i) => {
          const key = Object.keys(checkbox)[0];
          if (key.includes("price") && i !== index) {
            updatedFilters[group][i][key] = false;
          }
        });
      }
    }
    updatedFilters[group][index][Object.keys(updatedFilters[group][index])[0]] =
      !updatedFilters[group][index][
        Object.keys(updatedFilters[group][index])[0]
      ];
    setFilters(updatedFilters);

    let filteredProducts = allProducts?.data;

    // Apply all active filters
    const activeFilters = Object.keys(updatedFilters).filter((key) =>
      updatedFilters[key].some((filter) => Object.values(filter)[0])
    );

    activeFilters.forEach((filterType) => {
      console.log(filterType);
      switch (filterType) {
        case "gender":
          const selectedGenders = updatedFilters.gender
            .filter((filter) => Object.values(filter)[0])
            .map((item) => Object.keys(item)[0]);

          if (selectedGenders.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              selectedGenders.includes(product.gender)
            );
          }
          break;
        case "sort":
          const selectedSort = updatedFilters.sort
            .filter((filter) => Object.values(filter)[0])
            .map((item) => Object.keys(item)[0]);

          if (selectedSort.length > 0) {
            let sortedData = [...filteredData];

            if (selectedSort.includes("price(low to high)")) {
              sortedData = sortedData.sort((a, b) => {
                return parseInt(a.price) - parseInt(b.price);
              });
            }

            if (selectedSort.includes("price(high to low)")) {
              sortedData = sortedData.sort((a, b) => {
                return parseInt(b.price) - parseInt(a.price);
              });
            }
            if (selectedSort.includes("newest")) {
              sortedData = sortedData.sort((a, b) => {
                return Date.parse(b.addingdate) - Date.parse(a.addingdate);
              });
            }
            filteredProducts = sortedData;
          }
          break;

        case "availability":
          const selectedAvailability = updatedFilters.availability
            .filter((filter) => Object.values(filter)[0])
            .map((item) => Object.keys(item)[0]);

          if (selectedAvailability.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              selectedAvailability.includes(product.availability)
            );
          }
          break;
        case "categories":
          const selectedCategory = updatedFilters.categories
            .filter((filter) => Object.values(filter)[0])
            .map((item) => Object.keys(item)[0]);
          console.log(filteredProducts[0]);
          if (selectedCategory.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
              selectedCategory.includes(product.productcollection)
            );
          }
          break;
        case "size":
          const selectedSizes = updatedFilters.size
            .filter((filter) => Object.values(filter)[0])
            .map((item) => Object.keys(item)[0]);
          console.log(selectedSizes);
          console.log(filteredProducts[0].size);
          // if (selectedSizes.length > 0) {
          //   console.log(
          //     filteredProducts.filter((product) =>
          //       selectedSizes.includes((siz) => {
          //         product.siz[siz];
          //       })
          //     ),
          //     "first logic"
          //   );
          // }
          if (selectedSizes.length > 0) {
            filteredProducts = filteredProducts.filter((product) => {
              return selectedSizes.some((size) => product.size[size] > 0);
            });
          }
          break;

        default:
          break;
      }
    });

    setfilteredData(filteredProducts);
  };

  return (
    <>
      {isLoading ? (
        <MySpinner />
      ) : (
        <div className="containerX">
          <div className="m-0 filters">
            <div className="heading">Products</div>
            <div>
              <CustomButton
                onClick={toggleNavigation}
                text={isOpen ? "Hide Filter" : "Show Filter"}
                width={"auto"}
                height={"auto"}
              />
              {/* <span className="iconSpan" onClick={toggleNavigation}>
            <IconFilter />
          </span> */}
            </div>
          </div>
          <Row className="m-0">
            <div className={` p-0 simplebar-container ${isOpen ? "show" : ""}`}>
              <SimpleBar
                style={{ width: "100%", minHeight: "100px" }}
                ref={simpleBarRef}
                autoHide={false}
              >
                <Accordion
                  activeKey={activeKey}
                  alwaysOpen
                  onSelect={handleAccordionChange}
                  className="pt-4"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Sort By</Accordion.Header>
                    <Accordion.Body>
                      {filters.sort.map((checkbox, index) => {
                        const key = Object.keys(checkbox)[0];
                        return (
                          <div key={index} className="filterType">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="same"
                              name="sortby"
                              checked={checkbox[key]}
                              onChange={() => handleFilter("sort", index)}
                            />
                            <label class="form-check-label" for={key}>
                              {key.toUpperCase()}
                            </label>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Availability</Accordion.Header>
                    <Accordion.Body>
                      {filters.availability.map((checkbox, index) => {
                        const key = Object.keys(checkbox)[0];
                        return (
                          <div key={index} className="filterType">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id={key}
                              name="availability"
                              checked={checkbox[key]}
                              onChange={() =>
                                handleFilter("availability", index)
                              }
                            />
                            <label class="form-check-label" for={key}>
                              {key.toUpperCase()}
                            </label>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Size</Accordion.Header>
                    <Accordion.Body>
                      {filters.size.map((checkbox, index) => {
                        const key = Object.keys(checkbox)[0];
                        return (
                          <div key={index} className="filterType">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id={key}
                              name="size"
                              checked={checkbox[key]}
                              onChange={() => handleFilter("size", index)}
                            />
                            <label class="form-check-label" for={key}>
                              {key.toUpperCase()}
                            </label>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Gender</Accordion.Header>
                    <Accordion.Body>
                      {filters.gender.map((checkbox, index) => {
                        const key = Object.keys(checkbox)[0];
                        return (
                          <div key={index} className="filterType">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id={key}
                              name="gender"
                              checked={checkbox[key]}
                              onChange={() => handleFilter("gender", index)}
                            />
                            <label class="form-check-label" for={key}>
                              {key.toUpperCase()}
                            </label>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Categories</Accordion.Header>
                    <Accordion.Body>
                      {filters.categories.map((checkbox, index) => {
                        const key = Object.keys(checkbox)[0];
                        return (
                          <div key={index} className="filterType">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id={key}
                              name="categories"
                              checked={checkbox[key]}
                              onChange={() => handleFilter("categories", index)}
                            />
                            <label class="form-check-label" for={key}>
                              {key.toUpperCase()}
                            </label>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </SimpleBar>
            </div>

            <Col>
              <div class="containerY">
                {/* <div> */}
                {/* <div className="imgDiv">
                <img src="/photos/photo1.jpg" alt="T-shirt 1" />
                <div className="title">T-shirt</div>
              </div>
            </div> */}

                {filteredData?.map((item, index) => {
                  return (
                    <div class="card" key={index}>
                      <NavLink key={index} to={`/tshirt/${item._id}`}>
                        <div className="outerImgDiv">
                          <img
                            src={process.env.PUBLIC_URL + "/photos/photo1.jpg"}
                            alt="Card 2"
                          />
                        </div>
                        <div className="cardData">
                          <h3 className="m-0 p-0">{item.name}</h3>
                          <p className="mb-2">${item.price}</p>
                        </div>
                      </NavLink>
                    </div>
                  );
                })}

                {/* <div class="card">
              <img src="/photos/photo1.jpg" alt="Card 2" />
              <div className="cardData">
                <h3 className="m-0 p-0">Card 2</h3>
                <p className="mb-2">Description for Card 2.</p>
              </div>
            </div>
            <div class="card">
              <img src="/photos/photo1.jpg" alt="Card 3" />
              <h3>Card 3</h3>
              <p>Description for Card 3.</p>
            </div>
            <div class="card">
              <img src="https://via.placeholder.com/300x200" alt="Card 4" />
              <h3>Card 4</h3>
              <p>Description for Card 4.</p>
            </div>
            <div class="card">
              <img src="https://via.placeholder.com/300x200" alt="Card 5" />
              <h3>Card 5</h3>
              <p>Description for Card 5.</p>
            </div>
            <div class="card">
              <img src="https://via.placeholder.com/300x200" alt="Card 6" />
              <h3>Card 6</h3>
              <p>Description for Card 6.</p>
            </div> */}
              </div>
            </Col>
          </Row>
          {
            <div className={` p-0 mobileFilter ${isOpen ? "show" : ""}`}>
              <div className="filterNav">
                <div className="moblileFilterHeading">Filter</div>{" "}
                <div className="closeMobileFilter" onClick={toggleNavigation}>
                  X
                </div>
              </div>
              <hr />
              <Accordion
                activeKey={activeKey}
                alwaysOpen
                onSelect={handleAccordionChange}
                className="pt-4"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Sort By</Accordion.Header>
                  <Accordion.Body>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="newest"
                        name="sortby"
                      />
                      <label class="form-check-label" for="newest">
                        NEWEST
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="topseller"
                        name="sortby"
                      />
                      <label class="form-check-label" for="topseller">
                        TOP SELLER
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="price"
                        name="sortby"
                      />
                      <label class="form-check-label" for="price">
                        PRICE(HIGH TO LOW)
                      </label>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Availability</Accordion.Header>
                  <Accordion.Body>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="available"
                        name="availability"
                      />
                      <label class="form-check-label" for="available">
                        AVAILABLE
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="notavailable"
                        name="availability"
                      />
                      <label class="form-check-label" for="notavailable">
                        NOT AVAILABLE
                      </label>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Size</Accordion.Header>
                  <Accordion.Body>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="XS"
                        name="size"
                      />
                      <label class="form-check-label" for="XS">
                        XS
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="S"
                        name="size"
                      />
                      <label class="form-check-label" for="S">
                        S
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="M"
                        name="size"
                      />
                      <label class="form-check-label" for="M">
                        M
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="L"
                        name="size"
                      />
                      <label class="form-check-label" for="L">
                        L
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="XL"
                        name="size"
                      />
                      <label class="form-check-label" for="XL">
                        XL
                      </label>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Gender</Accordion.Header>
                  <Accordion.Body>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="Male"
                        name="gender"
                      />
                      <label class="form-check-label" for="Male">
                        MALE
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="female"
                        name="gender"
                      />
                      <label class="form-check-label" for="female">
                        FEMALE
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="unisex"
                        name="gender"
                      />
                      <label class="form-check-label" for="unisex">
                        UNISEX
                      </label>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Categories</Accordion.Header>
                  <Accordion.Body>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="Anime"
                        name="category"
                      />
                      <label class="form-check-label" for="Anime">
                        ANIME
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="marvel"
                        name="category"
                      />
                      <label class="form-check-label" for="marvel">
                        MARVEL
                      </label>
                    </div>
                    <div className="filterType">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="DC"
                        name="category"
                      />
                      <label class="form-check-label" for="DC">
                        DC
                      </label>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="closeMobileBtn">
                <CustomButton
                  text="Apply"
                  width={"auto"}
                  height={"auto"}
                  onClick={toggleNavigation}
                />
                <CustomButton
                  text="Close"
                  width={"auto"}
                  height={"auto"}
                  onClick={toggleNavigation}
                />
              </div>
            </div>
          }
        </div>
      )}
    </>
    //   <h2>Heading should be here</h2>
    //   <div className={` main ${isOpen ? "mainopen" : ""} `}>
    //
    //     <button onClick={toggleNavigation}>Open Navigation</button>
    //   </div>
    // </div>
  );
}

export default AllProducts;
