import React, { useEffect, useRef, useState } from "react";
import "./products.css";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { Accordion, Col, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import IconFilter from "../../components/icons/IconFilter";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const simpleBarRef = useRef();
  const navigate = useNavigate();
  const cards = [
    {
      title: "T-shirt 1",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 2",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 3",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 4",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 5",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 6",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 7",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 8",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 9",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
    {
      title: "T-shirt 10",
      prize: "1499",
      imageUrl: "./photos/photo1.jpg",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (simpleBarRef.current) {
      simpleBarRef.current.recalculate();
    }
  }, []);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };
  const [activeKey, setActiveKey] = useState(["0", "1", "2", "3", "4"]); // Make sure the keys are strings

  // Handler function to update the active accordion items
  const handleAccordionChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  return (
    <div className="containerX">
      <div className="m-0 filters">
        <div className="heading">All Products</div>
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
          </SimpleBar>
        </div>

        <Col>
          <div class="containerY">
            {/* <div> */}
            {/* <div className="imgDiv">
                <img src="./photos/photo1.jpg" alt="T-shirt 1" />
                <div className="title">T-shirt</div>
              </div>
            </div> */}
            {cards.map((item, index) => {
              return (
                <div
                  class="card"
                  key={index}
                  onClick={() => {
                    navigate("/tshirts/tshirt");
                  }}
                >
                  <div className="outerImgDiv">
                    <img src={item.imageUrl} alt="Card 2" />
                  </div>
                  <div className="cardData">
                    <h3 className="m-0 p-0">{item.title}</h3>
                    <p className="mb-2">{item.prize}</p>
                  </div>
                </div>
              );
            })}

            {/* <div class="card">
              <img src="./photos/photo1.jpg" alt="Card 2" />
              <div className="cardData">
                <h3 className="m-0 p-0">Card 2</h3>
                <p className="mb-2">Description for Card 2.</p>
              </div>
            </div>
            <div class="card">
              <img src="./photos/photo1.jpg" alt="Card 3" />
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
      {isOpen && (
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
      )}
    </div>

    //   <h2>Heading should be here</h2>
    //   <div className={` main ${isOpen ? "mainopen" : ""} `}>
    //
    //     <button onClick={toggleNavigation}>Open Navigation</button>
    //   </div>
    // </div>
  );
}

export default AllProducts;
