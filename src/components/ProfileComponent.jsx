import React from "react";
import { Box,Text,Avatar,Stack,Button,Divider } from "@chakra-ui/react";

const ProfileComponent = ({ name, username, bio, joinDate, followers, following }) => {
  return (
    <Box maxW="620px"
      mx="auto"
      mt={6}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
    >
      {/* Header Section */}
      <Box
        bg="gray.200"
        h="100px"
        borderRadius="lg"
        mb={-12}
        position="relative"
      ></Box>

      {/* Profile Picture */}
      <Avatar
        size="xl"
        name={name || "User"}
        src=""
        position="relative"
        top="-50px"
        mx="auto"
        border="4px solid white"
      />

      {/* Profile Details */}
      <Box textAlign="center" mt="-8">
        <Text fontSize="xl" fontWeight="bold">
          {name || "Example Account"}
        </Text>
        <Text fontSize="sm" color="gray.500">
          @{username || "ExampleUser"}
        </Text>
        <Text fontSize="sm" mt={2}>
          {bio || "This is just a sample profile :)"}
        </Text>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Joined {joinDate || "October 2020"}
        </Text>
      </Box>


      {/* Edit Profile Button */}
      <Box textAlign="center" mt={4}>
        <Button colorScheme="blue" size="sm">
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileComponent;
