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
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firebase Firestore configuration

const Search = () => {
  const [queryText, setQueryText] = useState("");
  const [results, setResults] = useState([]);

  // Handle search query submission
  const handleSearch = async () => {
    if (!queryText.trim()) {
      setResults([]);
      return;
    }

    // Firestore queries for users and posts
    const usersQuery = query(
      collection(db, "users"),
      where("name", ">=", queryText),
      where("name", "<=", queryText + "\uf8ff")
    );
    const postsQuery = query(
      collection(db, "posts"),
      where("title", ">=", queryText),
      where("title", "<=", queryText + "\uf8ff")
    );

    try {
      const [usersSnapshot, postsSnapshot] = await Promise.all([
        getDocs(usersQuery),
        getDocs(postsQuery),
      ]);

      const userResults = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        type: "user",
        ...doc.data(),
      }));
      const postResults = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        type: "post",
        ...doc.data(),
      }));

      setResults([...userResults, ...postResults]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Dynamic color mode values
  const bg = useColorModeValue("gray.100", "gray.900");
  const inputBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const suggestionBg = useColorModeValue("gray.200", "gray.700");
  const resultBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box
      p={6}
      bg={bg}
      borderWidth="2px"
      borderColor={borderColor} // Dynamic border color
      color={textColor}
      borderRadius="md"
      maxWidth="1200px"
      height="80vh"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Search Header */}
      <Box>
        <Heading size="lg" mb={6} textAlign="center">
          Search
        </Heading>

        {/* Search Input */}
        <InputGroup mb={6}>
          <Input
            placeholder="Search users or posts..."
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

        {/* Suggestions */}
        <HStack spacing={4} mb={6} wrap="wrap">
          {[
            "Trending Posts",
            "Popular Users",
            "Latest Updates",
            "Search by Hashtag",
          ].map((suggestion, index) => (
            <Button
              key={index}
              bg={suggestionBg}
              color={textColor}
              variant="outline"
              size="sm"
              _hover={{
                bg: useColorModeValue("gray.300", "gray.600"),
              }}
              onClick={() => setQueryText(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </HStack>
      </Box>

      <Divider mb={4} />

      {/* Search Results */}
      <VStack spacing={4} align="stretch" overflowY="auto">
        {results.length > 0 ? (
          results.map((item) =>
            item.type === "user" ? (
              <Box
                key={item.id}
                p={4}
                bg={resultBg}
                borderRadius="md"
                borderColor={borderColor} // Border for result box
                borderWidth="1px"
                boxShadow="sm"
              >
                <Heading size="sm">{item.name}</Heading>
                <Text>@{item.username}</Text>
              </Box>
            ) : (
              <Box
                key={item.id}
                p={4}
                bg={resultBg}
                borderRadius="md"
                borderColor={borderColor} // Border for result box
                borderWidth="1px"
                boxShadow="sm"
              >
                <Heading size="sm">{item.title}</Heading>
                <Text>By {item.author}</Text>
              </Box>
            )
          )
        ) : (
          <Text textAlign="center" color="gray.500">
            No results found. Try a different query.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Search;
