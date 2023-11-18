import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Col, Container, Row } from "react-bootstrap";
import MutipleSlidesPerView from "../../components/cardSlider";
import TextCard from "../../components/card/textCard";
import SideTextCard from "../../components/card/sideTextCard";
import axios from "axios";

function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, []);
  const [allProducts, setAllProducts] = useState();
  console.log(allProducts, "data hega");
  allProducts && console.log(allProducts, "data hega");
  const Products = [
    {
      productName: "T-shirt 1",
      collectionName: "Anime",
      prize: "1999",
      size: { XXS: 1, XS: 2, S: 2, M: 2, L: 2, XL: 2, XXL: 1 },
      style: ["OVERSIZED", "REGULAR"],
      artPlacement: ["FRONT", "BACK"],
      discription: "",
      details: "",
      images: [
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
      ],
    },
    {
      productName: "T-shirt 2",
      collectionName: "Anime",
      prize: "2499",
      size: { XXS: 1, XS: 2, S: 2, M: 2, L: 0, XL: 0, XXL: 1 },
      style: ["OVERSIZED", "REGULAR"],
      artPlacement: ["FRONT", "BACK"],
      discription: "",
      details: "",
      images: [
        "./photos/photo2.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
      ],
    },
    {
      productName: "T-shirt 3",
      collectionName: "Marvel",
      prize: "1199",
      size: { XXS: 0, XS: 0, S: 1, M: 2, L: 2, XL: 8, XXL: 1 },
      style: ["OVERSIZED", "REGULAR"],
      artPlacement: ["FRONT", "BACK"],
      discription: "",
      details: "",
      images: [
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo2.jpg",
        "./photos/photo1.jpg",
        "./photos/photo2.jpg",
        "./photos/photo1.jpg",
      ],
    },
    {
      productName: "T-shirt 4",
      collectionName: "Anime",
      prize: "1499",
      size: { XXS: 1, XS: 2, S: 2, M: 2, L: 2, XL: 2, XXL: 1 },
      style: ["OVERSIZED", "REGULAR"],
      artPlacement: ["FRONT", "BACK"],
      discription: "",
      details: "",
      images: [
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo2.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo2.jpg",
      ],
    },
    {
      productName: "T-shirt 5",
      collectionName: "Anime",
      prize: "1499",
      size: { XXS: 1, XS: 2, S: 2, M: 2, L: 2, XL: 2, XXL: 1 },
      style: ["OVERSIZED", "REGULAR"],
      artPlacement: ["FRONT", "BACK"],
      discription: "",
      details: "",
      images: [
        "./photos/photo2.jpg",
        "./photos/photo2.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo1.jpg",
        "./photos/photo2.jpg",
        "./photos/photo1.jpg",
      ],
    },
  ];
  return (
    <>
      <div className={styles.heroSection}>
        <img className={styles.img} src="./photos/photo2.jpg" alt="new" />
      </div>
      <div className={styles.featuredSection}>
        <div className={styles.sectionHeading}>Featured Items</div>
        <MutipleSlidesPerView products={allProducts} />
      </div>

      <Container className={styles.latestSection}>
        <div className={styles.sectionHeading}>The Latest</div>
        <Row className={styles.cardz}>
          <Col md={6} className={styles.featuredSectionA}>
            <TextCard />
          </Col>
          <Col md={6} className={styles.featuredSectionB}>
            <TextCard />
          </Col>
        </Row>
      </Container>

      <div className={styles.featuredSection}>
        <div className={styles.sectionHeading}>Rubbal's Pick for You</div>
        <MutipleSlidesPerView products={allProducts} />
      </div>
      <SideTextCard />
    </>
  );
}

export default Home;
