import PropTypes from "prop-types";
import shoes from "./shoesforteens.jpg";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="container d-flex">
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        <div className="col">
          <div className="card h-100" style={{ width: "20rem" }}>
            <img src={shoes} className="card-img-top" alt="shoes for kids" />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.category}</p>
              <p className="card-price">Price: ${product.price}</p>

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
        </div>
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
