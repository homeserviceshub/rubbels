// SideNavigation.js
import React, { useState } from "react";
import "./SideNavigation.css";

const SideNavigation = ({ isNavOpen }) => {
  const [isOpen, setIsOpen] = useState(isNavOpen);

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <span className="closebtn" onClick={toggleNavigation}>
        &times;
      </span>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  );
};

export default SideNavigation;
