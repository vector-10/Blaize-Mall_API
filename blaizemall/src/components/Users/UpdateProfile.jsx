import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Layouts/Loader";
import AlertComponent from "../AlertComponent";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/authContants";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  loadUser,
  clearErrors,
} from "../../redux/actions/authActions";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUser());
      navigate("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated, user, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <AlertComponent type="danger" message="User not successfuly updated" />
      )}
      {isUpdated && (
        <AlertComponent type="success" message="User updated successfully" />
      )}
      {user ? (
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
                      name="name"
                      value={name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      FullName
                    </label>
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      name="password"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Email address
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
                      update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        navigate("login")
      )}
    </div>
  );
};

export default UpdateProfile;
