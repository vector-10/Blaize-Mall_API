import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import shoepicture from "../Product/shoesforteens.jpg";
// import AlertComponent from "../AlertComponent";
import Loader from "../Layouts/Loader";
import { useParams } from "react-router-dom";
//import Product from "./Product";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, error, productId]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container p-5">
          <div className="d-flex justify-content-center align-items-center fs-2 fw-medium p-1 ">
            {product.name} Details
          </div>
          <div className="row">
            <div className="d-flex col-md-6">
              <img
                src={shoepicture}
                alt="picture of shoe"
                className="img-fluid"
              />
            </div>
            <div className="d-flex col-md-6 flex-column justify-content-center">
              <h2 className="fw-bold fs-2"> {product.name}</h2>
              <h3 className="fs-5">{product.description}</h3>
              <h3 className="fs-6">{product.price}</h3>
              <h3 className="fs-6">{product.rating}</h3>
              <h3 className="fs-6">{product.category}</h3>
              <h3 className="fs-6">{product.seller}</h3>
              <button
                className="btn fs-5"
                style={{ backgroundColor: "#2a1675", color: "white" }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
