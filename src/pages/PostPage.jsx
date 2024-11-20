// src/pages/PostPage.jsx
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
  GridItem,
} from "@chakra-ui/react";
import PostCard from "../components/PostCard";

// Sample data
const samplePost = {
  title: "Welcome to our App!",
  content: "This is a sample post.",
  author: "Admin",
  upvotes: 123,
  comments: 45,
};

const trendingPost = {
  title: "THIS IS TRENDING!",
  content: "This is a widespread trending post that is very important.",
  author: "Your God",
  upvotes: 999,
  comments: 200,
};

const userProfile = {
  name: "Ian Bajwa",
  username: "ian.bajwa",
  followers: 100,
  following: 50,
  bio: "Just a tech enthusiast!",
  profileImage: "/path/to/profile/image.jpg",
};

const PostPage = () => {
  return (
    <Flex
      minHeight="100vh"
      bg="black"
      color="white"
      justifyContent="center"
      p={4}
    >
      {/* Main Wrapper */}
      <Flex maxWidth="1200px" width="100%">
        {/* Sidebar Navigation */}
        <Box
          as="nav"
          width="200px"
          bg="black"
          p={4}
          boxShadow="md"
          height="100vh"
          position="sticky"
          top="0"
          left="0"
        >
          <VStack spacing={4} align="stretch">
            <Button variant="ghost" color="white" w="full">
              Trending
            </Button>
            <Button variant="ghost" color="white" w="full">
              Home
            </Button>
            <Button variant="ghost" color="white" w="full">
              Search
            </Button>
            <Button variant="ghost" color="white" w="full">
              Settings
            </Button>
          </VStack>
        </Box>

        {/* Three-Column Layout */}
        <Grid
          templateColumns="1fr 2fr 1fr"
          gap={6}
          ml={6} // Adds space between the sidebar and columns
          width="100%"
        >
          {/* Widespread Trending Post */}
          <GridItem colSpan={3} bg="gray.900" borderRadius="md" p={4}>
            <Heading size="lg" mb={2}>
              {trendingPost.title}
            </Heading>
            <Text mb={2}>{trendingPost.content}</Text>
            <Text fontSize="sm" color="gray.400">
              By {trendingPost.author} • {trendingPost.upvotes} Upvotes •{" "}
              {trendingPost.comments} Comments
            </Text>
          </GridItem>

          {/* Left Column: Followers' Recent Posts */}
          <VStack
            align="stretch"
            spacing={4}
            p={4}
            bg="gray.800"
            borderRadius="md"
          >
            <Heading size="md">Followers' Posts</Heading>
            <PostCard {...samplePost} /> {/* Placeholder for follower's post */}
            <PostCard {...samplePost} />{" "}
            {/* Add more follower posts as needed */}
          </VStack>

          {/* Middle Column: User's Own Posts */}
          <VStack
            align="stretch"
            spacing={4}
            p={4}
            bg="gray.700"
            borderRadius="md"
          >
            <Heading size="md">Your Posts</Heading>
            <PostCard {...samplePost} /> {/* Placeholder for user's post */}
            <PostCard {...samplePost} /> {/* Add more user posts as needed */}
          </VStack>

          {/* Right Column: User Profile */}
          <VStack
            align="stretch"
            spacing={4}
            p={4}
            bg="gray.800"
            borderRadius="md"
          >
            <Heading size="md">Your Profile</Heading>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={userProfile.profileImage}
              alt={userProfile.name}
              mb={4}
              alignSelf="center"
            />
            <Text fontWeight="bold">{userProfile.name}</Text>
            <Text>@{userProfile.username}</Text>
            <Text>{userProfile.bio}</Text>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  Followers
                </Text>
                <Text>{userProfile.followers}</Text>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="bold">
                  Following
                </Text>
                <Text>{userProfile.following}</Text>
              </Box>
            </Stack>
            <Button colorScheme="blue" variant="outline" mt={4}>
              Edit Profile
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default PostPage;
