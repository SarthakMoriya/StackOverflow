import React from "react";

const ProfileBio = ({ currentProfile }) => {
  return (
    <div>
      <div className="">
        {currentProfile?.tags ? (
          <>
            <h4>Tags Watched </h4>
            {currentProfile?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p>Zero tags found</p>
        )}
      </div>
      {
        currentProfile?.about ? (
          <>
            <h4>About</h4>
            <p>{currentProfile?.about}</p>
          </>
        ): <p>No Bio Found</p>
      }
    </div>
  );
};

export default ProfileBio;
