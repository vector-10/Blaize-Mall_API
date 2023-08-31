import Search from "./Search";
import logo from "../../imagesandicons/ecommerce.png";
import { Link } from "react-router-dom";
//import ALertComponent from "../AlertComponent";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions.js";
import profileimage from "../../imagesandicons/blaise.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="header py-1 " style={{ backgroundColor: "#210f60" }}>
      <nav className="navbar row ">
        <div className="col-12 col-md-3">
          <div className="navbar-brand d-flex justify-content-center align-items-center">
            <div className="store-name fs-2 fs-md-4" style={{ color: "white" }}>
              {" "}
              BlaizeMall
            </div>
            <Link to="/">
              <img
                src={logo}
                alt="mall logo"
                className="mall-logo mx-4"
                style={{ width: "60px", height: "60px" }}
              />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center ">
          {user ? (
            <div className="ml-4 dropdown d-inline ">
              <Link
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={profileimage}
                    alt={user && user.name}
                    className="img-fluid rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                </figure>
                <span style={{ fontSize: "12px" }}>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>

                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button
                className="btn  m-1"
                id="login_btn"
                style={{
                  color: "#210f60",
                  fontSize: "19px",
                  backgroundColor: "white",
                  padding: "5px 20px 5px 20px",
                }}
              >
                {" "}
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
