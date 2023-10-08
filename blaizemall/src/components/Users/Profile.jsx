import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import profileimage from "../../imagesandicons/blaise.jpg";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div className="vh-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h3 className="px-5 py-1"> User Profile </h3>
          <div className="card d-flex flex-row">
            <div className=" p-5">
              {" "}
              <img
                src={profileimage}
                alt="profile image"
                className="rounded-circle img-fluid"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <div className="vr "></div>
            <div className="m-5">
              <h3 className="text-muted">{user.name}</h3>
              <h4 className="text-muted">{user.email}</h4>

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-5"
              >
                Change password
              </Link>

              <Link
                to="/password/update"
                className="btn btn-danger btn-block mt-5"
              >
                Change password
              </Link>
              <div>
                {user.role !== "admin" && (
                  <Link
                    to="/orders/me"
                    className="btn btn-primary btn-block mt-5"
                  >
                    My Orders
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

// {
//   user.role !== "admin" && (
//     <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
//       My Orders
//     </Link>
//   );
// }
// <div className="d-flex ">
//   <Link
//     to="/me/update"
//     id="edit_profile"
//     className="btn btn-primary btn-block my-5"
//   >
//     Edit Profile
//   </Link>
// </div>;
