import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Heading,
  Text,
  Divider,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../services/firestoreService";

const Search = () => {
  const navigate = useNavigate();
  const [queryText, setQueryText] = useState("");
  const [results, setResults] = useState([]);

  // Handle search query submission
  const handleSearch = async () => {
    if (!queryText.trim()) {
      setResults([]);
      return;
    }

    try {
      // Fetch user(s) based on username matching queryText
      const userResult = await searchUser(queryText.toLowerCase());
      const userArray = Array.isArray(userResult)
        ? userResult
        : userResult
        ? [userResult]
        : [];

      const filteredUsers = userArray.filter((user) =>
        user.username.toLowerCase().includes(queryText.toLowerCase())
      );

      setResults(
        filteredUsers.map((user) => ({
          id: user.userId,
          type: "user",
          ...user,
        }))
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Dynamic color mode values
  const bg = useColorModeValue("gray.100", "gray.900");
  const inputBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const resultBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      p={6}
      bg={bg}
      borderWidth="2px"
      borderColor={borderColor}
      color={textColor}
      borderRadius="md"
      maxWidth="1200px"
      height="80vh"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex justify="flex-end" mb={4}>
        <Button
          size="sm"
          onClick={() => navigate("/home")}
          colorScheme="green"
          bg="limegreen"
          color="white"
          _hover={{ bg: "darkgreen" }}
          variant="outline"
        >
          Home
        </Button>
      </Flex>

      {/* Search Header */}
      <Box>
        <Heading size="lg" mb={6} textAlign="center">
          Search Users
        </Heading>

        {/* Search Input */}
        <InputGroup mb={6}>
          <Input
            placeholder="Search by username..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            bg={inputBg}
            color={textColor}
            size="lg"
            _placeholder={{
              color: useColorModeValue("gray.500", "whiteAlpha.700"),
            }}
          />
          <InputRightElement
            width="6rem"
            display="flex"
            justifyContent="center"
          >
            <Button
              size="lg"
              onClick={handleSearch}
              colorScheme="blue"
              style={{
                marginTop: "8px",
              }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      <Divider mb={4} />

      {/* Search Results */}
      <VStack spacing={4} align="stretch" overflowY="auto">
        {results.length > 0 ? (
          results.map((item) => (
            <Box
              key={item.id}
              p={4}
              bg={resultBg}
              borderRadius="md"
              borderColor={borderColor}
              borderWidth="1px"
              boxShadow="sm"
            >
              <Heading size="sm">{item.username}</Heading>
              <Text>{item.fullName}</Text>
              <Text>{item.bio}</Text>
            </Box>
          ))
        ) : (
          <Text textAlign="center" color="gray.500">
            No users found. Try a different query.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Search;
