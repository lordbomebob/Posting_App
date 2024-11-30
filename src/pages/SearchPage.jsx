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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion.id}
              bg={suggestionBg}
              color={textColor}
              variant="outline"
              size="sm"
              _hover={{
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg: useColorModeValue("gray.300", "gray.600"),
              }}
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
