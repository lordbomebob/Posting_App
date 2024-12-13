import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { returnUser } from "../components/returnUser";
import { getAuth } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../services/authService";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null); 
  const { username } = useParams();
  const navigate = useNavigate(); 
  const auth = getAuth();
  const userId = getCurrentUserId();

  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(`Fetching user with username: ${username}`); 
        const userData = await returnUser(userId); 
        console.log("Firebase returned user data:", userData); 

        if (userData) {
          setProfileData(userData);
          const readableJoiningDate = userData.joiningDate?.toDate
            ? userData.joiningDate.toDate().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : "Unknown Date";

          setProfileData({ ...userData, joiningDate: readableJoiningDate });
        } else {
          console.error("No user data found in Firestore for this user!");
          setError("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    if (userId) {
      console.log(`Current logged-in userId: ${userId}`); // Log the userId
      getUserData();
    } else {
      console.warn("No user ID found. Redirecting to login.");
      return navigate("/");
    }
  }, [userId, username]);

  return (
    <div>
      {error && <p>{error}</p>}
      {profileData ? (
        <ProfileComponent
          fullName={profileData.fullName}
          username={profileData.username}
          bio={profileData.bio}
          joiningDate={profileData.joiningDate}
        />
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;


/*const profileData = {
    name: "Example Account",
    username: "ExampleUser",
    bio: "This is just a sample profile :)",
    joinDate: "October 2020",
  };*/