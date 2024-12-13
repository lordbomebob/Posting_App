import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { returnUser } from "../components/returnUser";
import { getAuth } from "firebase/auth";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null); 
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await returnUser(userId);
        if (userData) {
          setProfileData(userData);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (userId) { 
      getUserData();
    }
  }, [userId]);

   /*const profileData = {
    name: "Example Account",
    username: "ExampleUser",
    bio: "This is just a sample profile :)",
    joinDate: "October 2020",
  };*/

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


export default ProfilePage;