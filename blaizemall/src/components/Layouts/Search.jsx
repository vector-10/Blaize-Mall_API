import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs"; // search icon from react icons npm package
//import Wrongsearch from "./Wrongsearch";

const Search = () => {
  const navigate = useNavigate();
  const [keywordSearch, setKeywordSearch] = useState("");

  const searchProducts = (e) => {
    e.preventDefault();
    console.log("search button clicked");

    if (keywordSearch.trim()) {
      navigate(`/search/${keywordSearch}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <form onSubmit={searchProducts}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search for a product ..."
          onChange={(e) => setKeywordSearch(e.target.value)}
        />
        <div className="input-group-append">
          <button className="button" style={{ backgroundColor: " #FFD700" }}>
            <BsSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
