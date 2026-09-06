import React from "react";
import { navbarStyles } from "../assets/dummyStyles";
import img1 from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user: propUser, onLogout }) => {
  const navigate = useNavigate();
  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className={navbarStyles.logoContainer}
        >
          <div className={navbarStyles.logoImage}>
            <img src={img1} alt="Logo" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
