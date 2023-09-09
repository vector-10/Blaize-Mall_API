import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//import Loader from "../Layouts/Loader";
//import AlertComponent from "../AlertComponent";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../redux/actions/authActions";
import { motion } from "framer-motion";
import illustration from "../../imagesandicons/animated-seller.svg";

// animation parameters for framer-motion
const imageVariants = {
  hidden: { y: -5 },
  visible: {
    y: 20,
    transition: {
      delay: 1.0,
      duration: 1.0,
      type: "tween",
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  //set useState to an object of details neeeded from the user
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [message, setMessage] = useState("");

  // define all the details neede and let them be user so that we
  //can then set e.target.value to their new values with handleChnage function

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ ...user }));
  };

  return (
    <div>
      <section className="vh-100 hero">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5 ">
              <motion.img
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                src={illustration}
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form encType="multipart/form-data">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p
                    className="lead fw-normal mb-0 me-3 fs-4 fw-bold"
                    style={{ color: "#210f60" }}
                  >
                    Join us at BlaizeMall Today!
                  </p>
                </div>

                <div className="divider d-flex align-items-center my-4"></div>

                <div className="form-outline mb-1">
                  <input
                    type="name"
                    id="name_field"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Name
                  </label>
                </div>
                <div className="form-outline mb-1">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-1">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>
                <div className="form-outline mb-1">
                  <input
                    type="password"
                    id="form3Example5"
                    className="form-control form-control-lg"
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Confirm Password
                  </label>
                </div>

                <div className="text-center text-lg-start mt-3 pt-2">
                  <button
                    onClick={handleSubmit}
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
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an Account?{" "}
                    <Link to="/login" className="link-primary">
                      Login
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

export default Register;

/* <div className="d-flex justify-content-between align-items-center">
<div className="form-check mb-0">
  <input
    className="form-check-input me-2"
    type="checkbox"
    value=""
    id="form2Example3"
  />
  <label className="form-check-label" htmlFor="form2Example3">
    Remember me
  </label>
</div>
<a href="#!" className="text-body">
  Forgot password?
</a>
</div> */
// };

{
  /* <div className="form-group">
<label htmlFor="avatar_upload">Avatar</label>
<div className="d-flex align-items-center">
  <div>
    <figure className="avatar mr-3 item-rtl">
      <img
        src={avatarPreview}
        className="rounded-circle"
        alt="avatar-preview"
      />
    </figure>
  </div>
  <div className="custom-file">
    <input
      type="file"
      name="avatar"
      className="custom-file-input"
      id="customFile"
      accept="images/*"
      onChange={handleChange}
    />
    <label className="custom-file-label" htmlFor="customFile">
      Choose Avatar
    </label>
  </div>
</div>
</div> */
}
