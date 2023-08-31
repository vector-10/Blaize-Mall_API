import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import { useEffect } from "react";
import Product from "./Product/Product";
import Loader from "./Layouts/Loader";
import AlertComponent from "./AlertComponent";
import { useParams } from "react-router-dom";

const Home = () => {
  const { keywordSearch } = useParams();
  const dispatch = useDispatch();
  //importing the products, resultsperpage and loading through state from the backend
  const { products, loading, error } = useSelector((state) => state.products);

  //use effect will load first to get products
  useEffect(() => {
    dispatch(getProducts(keywordSearch));
  }, [dispatch, error, keywordSearch]);

  return (
    <div className="product">
      {loading ? (
        <Loader />
      ) : (
        <div className="row row-cols-5 ">
          {products &&
            products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
        </div>
      )}
      <div className="notification-card mt-1 mb-2">
        {error ? (
          <AlertComponent
            type="danger"
            message="Products not successfully loaded"
            timeout={5000}
          />
        ) : (
          <AlertComponent
            type="success"
            message="Products successfully loaded"
            timeout={5000}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
