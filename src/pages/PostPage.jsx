import {
  Box,
  Flex,
  Grid,
  VStack,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  useColorModeValue,
  GridItem,
} from "@chakra-ui/react";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const bg = useColorModeValue("gray.100", "#101010"); // Light and dark backgrounds
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  return (
    <Flex
      minHeight="100vh"
      bg={bg}
      color={textColor}
      justifyContent="center"
      p={4}
    >
      <Flex maxWidth="1200px" width="100%">
        {/* Sidebar Navigation */}
        <Box
          as="nav"
          width="200px"
          bg={bg}
          p={4}
          boxShadow="md"
          height="100vh"
          position="sticky"
          top="0"
          left="0"
        >
          <VStack spacing={4} align="stretch">
            <Button variant="ghost" color={textColor} w="full">
              Trending
            </Button>
            <Button variant="ghost" color={textColor} w="full">
              Home
            </Button>
            <Button variant="ghost" color={textColor} w="full">
              Search
            </Button>
            <Button variant="ghost" color={textColor} w="full">
              Settings
            </Button>
          </VStack>
        </Box>

        {/* Three-Column Layout */}
        <Grid templateColumns="1fr 2fr 1fr" gap={6} ml={6} width="100%">
          <GridItem
            colSpan={3}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="md"
            p={4}
          >
            <Heading size="lg" mb={2}>
              Trending Post
            </Heading>
            <Text mb={2}>This is a sample trending post content.</Text>
          </GridItem>
          <VStack
            align="stretch"
            spacing={4}
            p={4}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="md"
          >
            <Heading size="md">Followers' Posts</Heading>
            <PostCard />
          </VStack>
          <VStack
            align="stretch"
            spacing={4}
            p={4}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="md"
          >
            <Heading size="md">Your Posts</Heading>
            <PostCard />
          </VStack>
          <VStack
            align="stretch"
            spacing={4}
            p={4}
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="md"
          >
            <Heading size="md">Your Profile</Heading>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default PostPage;
