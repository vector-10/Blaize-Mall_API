import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Layouts/Loader";
import profileimage from "../../imagesandicons/blaise.jpg";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="vh-100  ">
          <h2 className="mt-1 nl-5 px-5">{`${user.name}`}Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  src={profileimage}
                  className="rounded-circle img-fluid"
                  alt="profile"
                  style={{ width: "150px", height: "150px" }}
                />
              </figure>
              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>
            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user && user.name}</p>
              <h4>Email Address</h4>
              <p>{user.email}</p>
              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-5"
              >
                Change password
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
