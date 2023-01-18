import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateProfile } from "../../actions/Users";

import "./UserProfile.css";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(currentUser?.user.name);
  const [about, setAbout] = useState(currentUser?.user.about);
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("AJI ")
    if (tags.length === 0) {
      dispatch(
        updateProfile(currentUser?.user?._id, {
          name,
          about,
          tags: currentUser?.user?.tags,
        })
      );
    } else {
      dispatch(updateProfile(currentUser?.user?._id, { name, about, tags }));
    }
    setSwitch(false);
  };
  return (
    <div>
      <h1 className="edit-profile-title">Edit your profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About</h3>
          <textarea
            cols="30"
            row="10"
            id="about"
            value={currentUser?.user?.about}
            placeholder={currentUser?.user?.about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </label>
        <label htmlFor="tags">
          <h3>Watched Tags</h3>
          <p>Add tags seperated by commas</p>
          <input
            id="tags"
            value={tags}
            type="text"
            placeholder={tags}
            onChange={(e) => setTags(e.target.value.split(","))}
          />
        </label>
        <br />
        <input
          type="submit"
          value="Update Profile"
          className="user-submit-btn"
        />
      </form>
    </div>
  );
};

export default EditProfileForm;
