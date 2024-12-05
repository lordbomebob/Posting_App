// src/pages/Settings/EditProfile.jsx
import { Box, Heading, VStack, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  return (
    <Box
      p={6}
      bg="gray.800"
      color="white"
      borderRadius="md"
      maxWidth="600px"
      mx="auto"
    >
      <Heading size="lg" mb={6} textAlign="center">
        Edit Profile
      </Heading>
      <VStack spacing={4}>
        <Input placeholder="Full Name" bg="gray.700" color="white" />
        <Input placeholder="Username" bg="gray.700" color="white" />
        <Input placeholder="Bio" bg="gray.700" color="white" />
      </VStack>
      <Button mt={6} colorScheme="blue" width="full">
        Save Changes
      </Button>
      <Button
        mt={4}
        colorScheme="red"
        onClick={() => navigate("/settings")}
        width="full"
      >
        Back to Settings
      </Button>
    </Box>
  );
};

export default EditProfile;
