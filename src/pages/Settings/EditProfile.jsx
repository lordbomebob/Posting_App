// src/pages/Settings/EditProfile.jsx
import { Flex, Stack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "../../components/EditProfile";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userProfileData, setUserProfileData] = useState({
    fullName: "",
    username: "",
    bio: "",
    profileImage: "",
  });

  const handleSubmit = () => {
    console.log("Updated Profile Data:", userProfileData);
    navigate("/settings");
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <EditProfileForm
          userProfileData={userProfileData}
          setUserProfileData={setUserProfileData}
          handleSubmit={handleSubmit}
        />
        <Button
          mt={4}
          colorScheme="red"
          onClick={() => navigate("/settings")}
          width="full"
        >
          Back to Settings
        </Button>
      </Stack>
    </Flex>
  );
};

export default EditProfile;
