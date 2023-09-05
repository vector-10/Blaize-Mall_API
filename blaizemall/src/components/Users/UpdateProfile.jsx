import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Loader from "../Layouts/Loader";
// import AlertComponent from "../AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../redux/actions/authActions";

const UpdateProfile = () => {
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <section className="vh-100 hero">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form encType="multipart/form-data">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p
                    className="lead fw-normal mb-0 me-3 fs-4 fw-bold"
                    style={{ color: "#210f60" }}
                  >
                    Update user Details
                  </p>
                </div>

                <div className="divider d-flex align-items-center my-4"></div>

                <div className="form-outline mb-2">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-2">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={(e) => submitHandler(e)}
                    id="register-button"
                    type="submit"
                    className="btn btn-lg"
                    disabled={loading ? true : false}
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                      backgroundColor: "#210f60",
                      color: "white",
                    }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Do not have an Account?{" "}
                    <Link to="/register" className="link-primary">
                      register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateProfile;
