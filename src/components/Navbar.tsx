import React from "react";
// Images
import searchIcon from "../images/search.svg";

const Navbar: React.FC<{}> = () => {
  return (
    <nav className="navbar">
      <h1 className="logo"> MSR </h1>
      <div className="search-input">
        <input type="text" name="search" id="search" />
        <label htmlFor="search"> Search </label>
        <img src={searchIcon} alt="search Icon" />
      </div>
    </nav>
  );
};

export default Navbar;
