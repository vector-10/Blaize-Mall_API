import PropTypes from "prop-types";
import shoes from "./shoesforteens.jpg";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card " style={{ width: "18rem" }}>
      <img src={shoes} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the content.
        </p>
        <Link
          to={`/product/${product._id}`}
          className="btn"
          style={{ backgroundColor: "#2a1675", color: "white" }}
        >
          {" "}
          View Details
        </Link>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    numOfReviews: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};
export default Product;

// <section className="product-container">
// <div className="product">
//   <img src={shoes} alt="shoes for teens" className="picture" />
//   <h3>{product.name}</h3>
//   <p>{product.description}</p>
//   <p>{product.category}</p>
//   <p>${product.price}</p>
//   <Link
//     to={`/product/${product._id}`}
//     className="btn"
//     style={{ backgroundColor: "#2a1675", color: "white" }}
//   >
//     {" "}
//     View Details
//   </Link>
// </div>
// </section>
