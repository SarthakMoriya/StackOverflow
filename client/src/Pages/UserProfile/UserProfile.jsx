import React, { useState } from "react";
import "./UserProfile.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";

import { useParams } from "react-router";
import { useSelector } from "react-redux";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import ProfileBio from "./ProfileBio";
import EditProfileForm from "./EditProfileForm";

const UserProfile = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.userReducer)
  const currentProfile = users.filter((user) => user._id === id)[0]
  const currentUser = useSelector((state) => state.currentUserReducer)
  const [Switch, setSwitch] = useState(false)
  
  const handleSwitch = () => {
    setSwitch(!Switch);
  };

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="black"
                fontSize="40px"
                py="30px"
                px="40px"
              >
                {currentProfile.name[0]}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser.user._id === id && (
              <button
                type="button"
                onClick={handleSwitch}
                className={!Switch ? "edit-profile-btn" : 'edit-profile-btn'}
              >
                <FontAwesomeIcon icon={faPen} />
                {!Switch ? "Edit Profile" : "Cancel"}
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
            ) : (
              <ProfileBio currentProfile={currentProfile}/>
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
