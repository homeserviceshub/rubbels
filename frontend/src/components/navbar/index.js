import React, { useState, useEffect } from "react";
import { menuItems } from "../../data/DataList";
import {
  FaTimes,
  FaBars,
  FaRegUser,
  FaUserAlt,
  FaSearch,
  FaRegHeart,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallCart from "../cart";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { openSearchModal } from "../../redux/actions/searchModal";
import SearchModal from "../modal/searchModal";

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [, setChangeActive] = useState("Home");
  const [checklogin] = useState(false); // Assuming it's a boolean value
  const [isMouseOverSubmenu] = useState(false);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(checklogin);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const showSmallCart = useSelector((state) => {
    return state.addToBagReducer;
  });
  const isSearchModalOpen = useSelector(
    (state) => state.searchModalReducer.isModalOpen
  );

  const handleSearchClick = () => {
    dispatch(openSearchModal());
  };

  useEffect(() => {
    setLoggedIn(checklogin);
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [checklogin]);

  const navbarStyle = {
    backgroundColor: scrollPosition > 50 ? "white" : "transparent",
    color: scrollPosition > 50 ? "black" : "rgb(139 139 139)",
  };

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  const GotoSignin = () => {
    navigate("/signin");
  };
  const gotoFav = () => {
    navigate("/favourites");
  };

  const GotoProfile = () => {
    navigate("/user/profile");
  };
  const gotoCart = () => {
    navigate("/mycart");
  };

  // const handleActiveRoute = (item) => {
  //   setChangeActive(item.title);
  //   if (window.innerWidth <= 768) {
  //     setDropdown(false);
  //   }
  // };
  const handleMouseEnter = (item) => {
    if (item.submenu) {
      setActiveSubmenu(item.title); // Show submenu when hovering
    }
  };

  const handleMouseLeave = () => {
    // Keep the submenu open if the mouse is over it
    if (!isMouseOverSubmenu) {
      setActiveSubmenu(null); // Hide submenu when not hovering
    }
  };

  // const handleSubmenuClick = (item) => {
  //   setActiveSubmenu(item.title);
  //   setShowSubmenuOverlay(true);
  // };

  // Update active route when domain path changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.url === currentPath);
    if (activeItem) {
      setChangeActive(activeItem.title);
    } else if (
      currentPath === "/services/service" ||
      currentPath === "/companyprofile" ||
      currentPath === "/servicerequest"
    ) {
      setChangeActive("Services");
    } else {
      // Handle the case when the route doesn't match any menu item (optional)
      setChangeActive("");
    }
  }, [location.pathname]);

  return (
    <div className="nav-out">
      <nav className="navbar" style={navbarStyle}>
        <div className="navbar-logo">
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            Rubbals Corner
          </div>
        </div>
        <div className="menu-icon" onClick={handleClick}>
          <span>
            {dropdown ? (
              <FaTimes fill="var(--color-primary)" />
            ) : (
              <FaBars fill="var(--color-primary)" />
            )}
          </span>
        </div>
        <ul className={dropdown ? "nav-menu active" : "nav-menu"}>
          <li className="item3" onClick={GotoSignin}>
            <FaRegUser /> Sign In / Register
          </li>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="item"
              onMouseEnter={() => handleMouseEnter(item)} // Add mouse enter event
              onMouseLeave={handleMouseLeave} // Add mouse leave event
            >
              {item.title}
              {item.submenu && activeSubmenu === item.title && (
                <ul className="submenu">
                  {item.submenu.map((subitem, subindex) => (
                    <li key={subindex}>
                      <Link className="options" to="/tshirts">
                        {subitem}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <ul className={dropdown ? "nav-menu2 active" : "nav-menu2"}>
          <li className="item">
            <FaSearch onClick={handleSearchClick} />
          </li>
          <li className="item2">
            <FaRegHeart onClick={gotoFav} />
          </li>
          <li className="item">
            <FaBagShopping onClick={gotoCart} />
          </li>
          {loggedIn ? (
            <li className="item2" onClick={GotoProfile}>
              <FaUserAlt />
            </li>
          ) : (
            <li className="item2" onClick={GotoSignin}>
              <FaRegUser />
            </li>
          )}
        </ul>
      </nav>
      {showSmallCart === true && <SmallCart />}

      {<SearchModal isSearchModalOpen={isSearchModalOpen} />}
    </div>
  );
};

export default Navbar;
