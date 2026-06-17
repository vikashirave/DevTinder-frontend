import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveProfile = async () => {
    // clear errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          about,
          gender,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setToastMessage(true);
      setTimeout(() => {
        setToastMessage(false);
      }, 3000);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mx-10 my-10 gap-10">
        <div className="flex justify-center">
          <div className="card card-border bg-gray-300 w-96">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <label>
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    value={firstName}
                    type="text"
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label>
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    value={lastName}
                    type="text"
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label>
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    value={age}
                    type="text"
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label>
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    value={about}
                    type="text"
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
                <label>
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    value={gender}
                    type="text"
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label>
                  <div className="label">
                    <span className="label-text">Photo URL</span>
                  </div>
                  <input
                    value={photoUrl}
                    type="text"
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-error">{error}</p>
              <div className="card-actions justify-center">
                <button onClick={handleSaveProfile} className="btn btn-primary">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {toastMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
