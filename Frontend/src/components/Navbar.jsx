import React, { useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [colorMode, setColorMode] = useState("light");
  const lightMode = <img src="/sun.svg" alt="" />;
  const darkMode = <img src="/moon.svg" alt="" />;

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <section className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <p>Product Store </p>
          <img src="/shopping-cart (1).svg" alt="" />
        </Link>
      </div>
      <div className="nav-right">
        <button>
          <Link to="/create" title="Add Product" >
            <img src="/plus-square.svg" alt="" />
          </Link>
        </button>
        <button onClick={toggleColorMode}>
          {/* {colorMode === "light" ? darkMode : lightMode} */}
          {colorMode === "light" ? darkMode : lightMode}
        </button>
      </div>
    </section>
  );
}

export default Navbar;
