// src/pages/Settings/Security.jsx
import {
  Box,
  Heading,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Security = () => {
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
        Security Settings
      </Heading>
      <VStack spacing={4}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="two-factor-auth" mb="0">
            Two-Factor Authentication
          </FormLabel>
          <Switch id="two-factor-auth" colorScheme="blue" />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="login-alerts" mb="0">
            Login Alerts
          </FormLabel>
          <Switch id="login-alerts" colorScheme="red" />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="password-reset" mb="0">
            Password Reset Protection
          </FormLabel>
          <Switch id="password-reset" colorScheme="green" />
        </FormControl>
      </VStack>
      <Button
        mt={6}
        colorScheme="red"
        onClick={() => navigate("/settings")}
        width="full"
      >
        Back to Settings
      </Button>
    </Box>
  );
};

export default Security;
