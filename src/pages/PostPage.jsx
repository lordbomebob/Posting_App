import React, { useEffect, useState } from "react";
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
  IconButton,
  useColorModeValue,
  GridItem,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaArrowUp, FaArrowDown, FaCommentAlt } from "react-icons/fa";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({
    name: "Ian Bajwa",
    username: "ian.bajwa",
    bio: "Tech enthusiast exploring the world of coding!",
    profileImage: "/bird.jpg",
  });

  // Sample posts for "Your Posts"
  const sampleYourPosts = [
    {
      id: "1",
      title: "My Coding Journey",
      author: "ian.bajwa",
      content: "Sharing insights and lessons from learning to code!",
      date: "2024-12-01",
      upvotes: 10,
      downvotes: 2,
      comments: 5,
    },
    {
      id: "2",
      title: "New Firebase Feature!",
      author: "ian.bajwa",
      content: "Exploring the latest updates in Firebase.",
      date: "2024-12-02",
      upvotes: 15,
      downvotes: 3,
      comments: 8,
    },
  ];

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  // Dynamic color modes
  const bg = useColorModeValue("gray.100", "#101010");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const profileBg = useColorModeValue("white", "gray.800");

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
        <Grid templateColumns="1.5fr 2fr 1.5fr" gap={4} ml={6} width="50%">
          {/* Trending Post Section */}
          <GridItem
            colSpan={3}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="md"
            p={4}
          >
            <Heading size="lg" mb={3}>
              Trending Post
            </Heading>
            <Text mb={2}>This is a sample trending post content.</Text>
          </GridItem>

          {/* Your Posts Section */}
          <VStack
            align="stretch"
            spacing={4}
            p={3}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="md"
          >
            <Heading size="md">Your Posts</Heading>
            <Button colorScheme="blue" variant="solid" mb={4}>
              Create Post
            </Button>
            {sampleYourPosts.map((post) => (
              <Box
                key={post.id}
                p={4}
                bg={useColorModeValue("gray.50", "gray.600")}
                borderRadius="md"
                boxShadow="sm"
                position="relative" // Make parent container relative
              >
                {/* Edit Post Button */}
                <Button
                  size="sm"
                  colorScheme="green"
                  variant="solid"
                  position="absolute"
                  top="8px"
                  right="8px"
                >
                  Edit Post
                </Button>
                <Heading size="sm" mb={2}>
                  {post.title}
                </Heading>
                <Text>By {post.author}</Text>
                <Text mt={2}>{post.content}</Text>
                <Text fontSize="sm" mt={2} color="gray.500">
                  Date Added: {post.date}
                </Text>
                <Flex mt={1} align="center" justify="space-between">
                  <Stack direction="row" spacing={2} mr={6}>
                    {" "}
                    {/* Add a `mr` (marginRight) here */}
                    <Button
                      size="sm"
                      leftIcon={<FaCommentAlt />}
                      variant="outline"
                      colorScheme="blue"
                    >
                      {post.comments} Comments
                    </Button>
                    <Button size="sm" colorScheme="blue" variant="outline">
                      Reply
                    </Button>
                  </Stack>
                  <IconButton
                    icon={<FaArrowUp />}
                    aria-label="Upvote"
                    variant="ghost"
                    colorScheme="green"
                  />
                  <Text>{post.upvotes}</Text>
                  <IconButton
                    icon={<FaArrowDown />}
                    aria-label="Downvote"
                    variant="ghost"
                    colorScheme="red"
                  />
                  <Text>{post.downvotes}</Text>
                </Flex>{" "}
              </Box>
            ))}
          </VStack>

          {/* Your Profile Section */}
          <VStack
            align="stretch"
            spacing={4}
            p={9}
            bg={profileBg}
            borderRadius="md"
            boxShadow="sm"
            gridColumn="3 / span 1"
          >
            <Heading size="md">Your Profile</Heading>
            <Image
              borderRadius="full"
              boxSize="100px"
              src={profile.profileImage}
              alt={profile.name}
              mb={4}
              alignSelf="center"
            />
            <Text fontWeight="bold">{profile.name}</Text>
            <Text>@{profile.username}</Text>
            <Text>{profile.bio}</Text>
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
