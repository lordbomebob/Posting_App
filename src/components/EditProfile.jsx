// src/components/EditProfile.jsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const EditProfileForm = ({
  userProfileData,
  setUserProfileData,
  handleSubmit,
}) => {
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.dark")}
      boxShadow={"lg"}
      p={8}
      w={{ base: "full", sm: "400px" }}
    >
      <Heading fontSize={"2xl"} textAlign={"center"} mb={6}>
        Edit Profile
      </Heading>
      <Stack spacing={4}>
        {/* Full Name */}
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
            value={userProfileData.fullName}
            onChange={(e) =>
              setUserProfileData({
                ...userProfileData,
                fullName: e.target.value,
              })
            }
          />
        </FormControl>

        {/* Username */}
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            value={userProfileData.username}
            onChange={(e) =>
              setUserProfileData({
                ...userProfileData,
                username: e.target.value,
              })
            }
          />
        </FormControl>

        {/* Bio */}
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Your Bio"
            value={userProfileData.bio}
            onChange={(e) =>
              setUserProfileData({ ...userProfileData, bio: e.target.value })
            }
          />
        </FormControl>

        {/* Profile Picture */}
        <FormControl>
          <FormLabel>Profile Image</FormLabel>
          <Input
            placeholder="Image Link"
            value={userProfileData.profileImage}
            onChange={(e) =>
              setUserProfileData({
                ...userProfileData,
                profileImage: e.target.value,
              })
            }
          />
          <Image
            justifySelf={"center"}
            src={userProfileData.profileImage}
            boxSize="150px"
            borderRadius="full"
            fit="cover"
            alt={userProfileData.profileImage || "Profile Image"}
            mt={4}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          loadingText="Submitting"
          size="lg"
          bg={useColorModeValue("gray.600", "gray.700")}
          color={"white"}
          _hover={{
            bg: useColorModeValue("gray.700", "gray.800"),
          }}
          mt={4}
          width="full"
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};

export default EditProfileForm;
