import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../Layouts/Loader";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          {
            isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            );
          }
        }}
      />
    </div>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
