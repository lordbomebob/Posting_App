import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    Stack,
    Textarea,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../services/authService"; // Importing the token functionality

const OnBoardCard = () => {
  const navigate = useNavigate();

  // Fetch `userId` (token) from local storage
  const [userID, setUserID] = useState(getCurrentUserId());
  const [userProfile, setUserProfile] = useState({
    username: "", // The username of the user
    fullName: "", // Full name of the user
    bio: "", // Short biography
    profilePicUrl:
      "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg", // Default profile picture URL
    joiningDate: new Date(), // Date the user joined
    posts: [], // Array of post IDs created by this user
    likedPosts: [], // Array of post IDs liked by this user
    savedPosts: [], // Array of post IDs saved by this user
    repliedPosts: [], // Array of post IDs where this user commented
    reposts: [], // Array of post IDs that the user reposted
  });

  // Fetch the `userId` (token) from local storage on component mount
  useEffect(() => {
    const storedUserId = getCurrentUserId();
    if (storedUserId) {
      setUserID(storedUserId);
    } else {
      console.warn("No userId found in local storage");
      // Optional: Navigate back to login if no token is found
      // navigate("/");
    }
  }, []);

  const handleSubmit = () => {
    if (!isValidURL(userProfile.profilePicUrl)) {
      console.warn("Invalid URL");
      alert("Invalid profile picture URL");
      return;
    }
    // Here you can add your upsert logic to save or update the user in the database
    console.log("handlesubmit after url check", { userID, userProfile });

    // Navigate to home after successful profile creation
    navigate("/home");
  };

  function isValidURL(url) {
    try {
      new URL(url); // Throws an error if invalid
      return true;
    } catch {
      return false;
    }
  }

  return (
    <Flex
      align={"center"}
      justify={"center"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Create Profile
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.dark")}
        boxShadow={"lg"}
        p={8}
        w={{ base: "full", sm: "400px" }}
      >
        <Stack>
          <HStack>
            <Box>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={userProfile.fullName}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, fullName: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={userProfile.username}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, username: e.target.value })
                  }
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Bio"
              value={userProfile.bio}
              onChange={(e) =>
                setUserProfile({ ...userProfile, bio: e.target.value })
              }
            ></Textarea>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Profile Picture</FormLabel>
            <Input
              placeholder="Provide link of picture"
              value={userProfile.profilePicUrl}
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  profilePicUrl: e.target.value,
                })
              }
              marginBottom={3}
            ></Input>
            <HStack justifyContent={"space-around"}>
              <Button
                onClick={() =>
                  setUserProfile({
                    ...userProfile,
                    profilePicUrl:
                      "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
                  })
                }
              >
                Default Picture
              </Button>
              <Button
                onClick={() =>
                  setUserProfile({ ...userProfile, profilePicUrl: "" })
                }
                textColor={"red"}
              >
                Clear Link
              </Button>
            </HStack>
          </FormControl>
          <Image
            src={userProfile.profilePicUrl}
            boxSize="150px"
            borderRadius="full"
            fit="cover"
            alt="profile pic"
            alignSelf={"center"}
          ></Image>

          <Button
            onClick={()=>handleSubmit()}
            loadingText="Submitting"
            size="lg"
            bg={useColorModeValue("gray.600", "gray.700")}
            color={"white"}
            _hover={{
              bg: useColorModeValue("gray.700", "gray.800"),
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default OnBoardCard;
