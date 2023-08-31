import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  loadUser,
  clearErrors,
} from "../../redux/actions/authActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../AlertComponent";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/authContants";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPrview, setAvatarPreview] = useState(
    "../../imagesandicons/blaise.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar);
    }
    if (error) {
        dispatch(clearErrors())
      return (
        <AlertComponent
          type="danger"
          message="an error occured"
          timeout={3000}
        />
        
      );
    }
    if (isUpdated) {
        dispatch(loadUser())
        navigate("/me")

        dispatch({
             type: UPDATE_PROFILE_RESET
        })
      return (
        <AlertComponent
          type="success"
          message="Profile successfully updated"
          timeout={3000}
        />
      );
    }
  }, [dispatch, navigate, error, isUpdated, user  ]);

  return <div></div>;
};

export default UpdateProfile;




// const dispatch = useDispatch();
// const navigate = useNavigate();
// const { isAuthenticated, error, loading } = useSelector(
//   (state) => state.auth
// );
// //set useState to an object of details neeeded from the user
// const [user, setUser] = useState({
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// });
// const [message, setMessage] = useState("");

// // define all the details neede and let them be user so that we
// //can then set e.target.value to their new values with handleChnage function

// useEffect(() => {
//   if (isAuthenticated) {
//     navigate("/home");
//   }

//   if (error) {
//     dispatch(clearErrors());
//   }
// }, [dispatch, isAuthenticated, error, navigate]);

// const handleChange = (e) => {
//   const name = e.target.name;
//   const value = e.target.value;
//   setUser({ ...user, [name]: value });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   dispatch(register({ ...user }));
// };