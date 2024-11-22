// src/pages/Search.jsx
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
} from "@chakra-ui/react";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Mock data for demonstration
  const mockData = [
    { id: 1, type: "user", name: "Ian Bajwa", username: "ian.bajwa" },
    { id: 2, type: "post", title: "Welcome to our App!", author: "Admin" },
    { id: 3, type: "user", name: "John Doe", username: "john.doe" },
    { id: 4, type: "post", title: "Breaking News!", author: "NewsAdmin" },
  ];

  const suggestions = [
    { id: 1, text: "Trending Posts" },
    { id: 2, text: "Popular Users" },
    { id: 3, text: "Latest Updates" },
    { id: 4, text: "Search by Hashtag" },
  ];

  // Handle search query submission
  const handleSearch = () => {
    const filteredResults = mockData.filter((item) =>
      item.type === "user"
        ? item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.username.toLowerCase().includes(query.toLowerCase())
        : item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  return (
    <Box
      p={6}
      bg="gray.800"
      color="white"
      borderRadius="md"
      maxWidth="1200px"
      height="80vh"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      border="1px solid"
      borderColor="gray.400" // Match text color for 'No results found'
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            bg="white"
            color="black"
            size="lg" // Increased size for emphasis
          />
          <InputRightElement width="6rem">
            <Button
              h="2rem"
              size="md"
              onClick={handleSearch}
              colorScheme="blue"
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>

        {/* Suggestions */}
        <HStack spacing={4} mb={6} wrap="wrap">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.id}
              colorScheme="gray"
              variant="outline"
              size="sm"
              onClick={() => setQuery(suggestion.text)}
            >
              {suggestion.text}
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
                bg="gray.700"
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading size="sm">{item.name}</Heading>
                <Text>@{item.username}</Text>
              </Box>
            ) : (
              <Box
                key={item.id}
                p={4}
                bg="gray.700"
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading size="sm">{item.title}</Heading>
                <Text>By {item.author}</Text>
              </Box>
            )
          )
        ) : (
          <Text textAlign="center" color="gray.400">
            No results found. Try a different query.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Search;
