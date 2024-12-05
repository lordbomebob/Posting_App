// src/pages/Settings/Privacy.jsx
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

const Privacy = () => {
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
        Privacy Settings
      </Heading>
      <VStack spacing={4}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="public-profile" mb="0">
            Public Profile
          </FormLabel>
          <Switch id="public-profile" colorScheme="blue" />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="searchable" mb="0">
            Allow Search Engines
          </FormLabel>
          <Switch id="searchable" colorScheme="purple" />
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

export default Privacy;
