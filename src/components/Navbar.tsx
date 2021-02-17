import React, { useState } from "react";
// Images
import searchIcon from "../images/search.svg";

interface Props {
  searchRepo: (query: string) => void;
}

const Navbar: React.FC<Props> = ({ searchRepo }) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  return (
    <nav className="navbar">
      <h1 className="logo"> MSR </h1>
      <div className="search-input">
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => {
            setIsEmpty(!e.currentTarget.value);
            searchRepo(e.currentTarget.value);
          }}
        />
        <label htmlFor="search" className={!isEmpty ? "hidden" : ""}> Search </label>
        <img src={searchIcon} alt="search Icon" />
      </div>
    </nav>
  );
};

export default Navbar;
