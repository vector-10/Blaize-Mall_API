import notfound from "../../imagesandicons/wrongsearch.svg";
const Wrongsearch = () => {
  return (
    <div className="wrong-search">
      <div>
        <img src={notfound} alt="not found SVG" className="not-found" />
      </div>

      <div className="not-found-message">
        <h1 style={{ color: "#210f60", fontSize: "25px" }}>
          Oops! The product you are looking for does not exist{" "}
        </h1>
      </div>
    </div>
  );
};

export default Wrongsearch;
