import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CardSlider.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SelectedProduct } from "../../redux/actions/selectedProduct";

export default function MultipleCardsComponent({ products }) {
  const [viewType, setViewType] = useState(""); // State to store the view type
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gotoTshirt = (item) => {
    dispatch(SelectedProduct(item));
    localStorage.setItem("selectedproduct", JSON.stringify(item));
    navigate("/tshirts/tshirt");
  };

  useEffect(() => {
    function getViewType() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        return "2";
      } else {
        return "3";
      }
    }

    function handleScreenSizeChange() {
      const newViewType = getViewType();
      setViewType(newViewType);
    }

    // Add an event listener to monitor screen size changes
    window.addEventListener("resize", handleScreenSizeChange);

    // Initial check of the screen size
    handleScreenSizeChange();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  }, []);
  return (
    <div>
      <Swiper
        slidesPerView={viewType}
        spaceBetween={30}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {products &&
          products.data.map((item, index) => (
            <SwiperSlide key={index} onClick={() => gotoTshirt(item)}>
              <div className="imgDiv">
                <img src={"./photos/photo1.jpg"} alt="T-shirt 1" />
              </div>
              <div className="title">{item.name}</div>
              <div className="subtitle">{item.price}</div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
