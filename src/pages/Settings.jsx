// src/pages/Settings.jsx
import { Box, Button, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <Box
      p={6}
      bg={useColorModeValue("gray.dark","white" )}
      color="white"
      borderRadius="md"
      maxWidth="600px"
      mx="auto"
    >
      <Heading size="lg" mb={6} textAlign="center" color={useColorModeValue("white","gray.dark" )}>
        Settings
      </Heading>
      <VStack spacing={4}>
        <Button
          onClick={() => navigate("/settings/security")}
          colorScheme="blue"
          width="full"
        >
          Security
        </Button>
        <Button
          onClick={() => navigate("/settings/edit-profile")}
          colorScheme="green"
          width="full"
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => navigate("/settings/privacy")}
          colorScheme="purple"
          width="full"
        >
          Privacy Settings
        </Button>
      </VStack>
    </Box>
  );
};

export default Settings;
