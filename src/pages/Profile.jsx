import React from "react";
import ProfileComponent from "../components/ProfileComponent";

const Profile = () => {
  const profileData = {
    name: "Example Account",
    username: "ExampleUser",
    bio: "This is just a sample profile :)",
    joinDate: "October 2020",
  };
  return (
    <div>
      <ProfileComponent
        name={profileData.name}
        username={profileData.username}
        bio={profileData.bio}
        joinDate={profileData.joinDate}
      />
    </div>
  )
}

export default Profile;