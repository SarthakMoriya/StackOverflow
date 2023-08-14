import React, { useState } from "react";
import "./UserProfile.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";

import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import ProfileBio from "./ProfileBio";
import EditProfileForm from "./EditProfileForm";
import { useEffect } from "react";

import { addFriendOp, removeFriendOp } from "../../actions/Users";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);
  // const User = useSelector((state) => state.currentUserReducer);
  const User = JSON.parse(localStorage.getItem("Profile"));

  // console.log(User,xyz);
  const { id } = useParams();
  const users = useSelector((state) => state.userReducer);
  const currentProfile = users.filter((user) => user?._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  // let latestUser=useSelector((state) => state.latestUserReducer);
  const [Switch, setSwitch] = useState(false);

  const fetchFriends = () => {
    //id is id of person whos profile we visited
    let userFriends = User?.user?.friends;
    // console.log(User?.user?.friends);
    const isFriend = userFriends?.findIndex((user) => user === id);
    if (isFriend !== -1) {
      console.log(isFriend);
      setFriend(true);
    }
  };
  useEffect(() => {
    fetchFriends();
    // console.log("Profile opened...")
  }, []);

  const handleRemove = () => {
    dispatch(removeFriendOp(User?.user?._id, id));
    fetchFriends();
    // alert("New Friends will be seen on LogIn ");
    // navigate("/auth");

    setFriend(false);
  };
  const handleAdd = () => {
    dispatch(addFriendOp(User?.user?._id, id));
    fetchFriends();
    // alert("New Friends will be seen on LogIn ");
    // navigate("/auth");
    setFriend(true);
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
                {currentProfile?.name[0]}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {/* If we are on current loggedIn user's Profile page and want to edit it */}
            {currentUser?.user?._id === id ? (
              <div className="flex flex-col items-center justify-between">
                <button
                  type="button"
                  //switch handles form to edit bio of current loggedIn user
                  onClick={() => {
                    setSwitch(!Switch);
                  }}
                  className={
                    !Switch ? "edit-profile-btn p-4" : "edit-profile-btn p-4"
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                  {!Switch ? "Edit Profile" : "Cancel"}
                </button>
                <button className=" p-4 edit-profile-btn mt-2">
                  <Link to={`/editaccount/${id}`}>Edit account</Link>
                </button>
              </div>
            ) : friend ? (
              <button className="ask-btn" onClick={handleRemove}>
                Remove Friend
              </button>
            ) : (
              <button className="ask-btn " onClick={handleAdd}>
                Add Friend
              </button>
            )}
          </div>
          <>
            {/* Form to edit bio */}
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
