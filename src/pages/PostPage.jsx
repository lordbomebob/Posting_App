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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp, FaCommentAlt } from "react-icons/fa";
import { fetchPostById, fetchUser } from "../services/firestoreService";
import { getCurrentUserId } from "../services/authService";

const PostPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // Empty array for user posts

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userId = getCurrentUserId();

        if (!userId) {
          console.warn("No user ID found. Redirecting to login.");
          return navigate("/"); // Redirect only if user is not logged in
        }

        // Fetch user profile
        const profileData = await fetchUser(userId);
        setProfile(profileData || { name: "New User", username: "username" });

        // Fetch posts by user ID
        const posts = (await fetchPostById(userId)) || [];
        setUserPosts(posts);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [navigate]);

  function showImage(images) {
    return images.map((image, index) => (
      <Box key={index} mb={4}>
        <Image
          src={image}
          alt={`Post image ${index + 1}`}
          borderRadius="md"
          boxShadow="sm"
          maxHeight="200px"
          objectFit="cover"
          width="100%"
        />
      </Box>
    ));
  }

  const bg = useColorModeValue("gray.100", "#101010");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const profileBg = useColorModeValue("white", "gray.800");

  return (
    <Flex
      minHeight="100vh"
      bg={bg}
      color={textColor}
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Flex
        maxWidth="1200px"
        width="100%"
        justifyContent="center"
        margin="0 auto"
      >
        {/* Main Content */}
        <Flex
          flexDirection="column"
          flexGrow={1}
          ml={6}
          justifyContent="center"
        >
          <Grid templateColumns="1.5fr 2fr 1.5fr" gap={4} width="100%">
            {/* Your Posts Section */}
            <VStack
              align="stretch"
              spacing={4}
              p={3}
              bg={useColorModeValue("white", "gray.700")}
              borderRadius="md"
            >
              <Heading size="md">Your Posts</Heading>
              <Button
                colorScheme="blue"
                variant="solid"
                mb={4}
                onClick={() => navigate("/create")}
              >
                Create Post
              </Button>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <Box
                    key={post.id}
                    p={4}
                    bg={useColorModeValue("gray.50", "gray.600")}
                    borderRadius="md"
                    boxShadow="sm"
                    position="relative"
                  >
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
                    {post.images &&
                      post.images.length > 0 &&
                      showImage(post.images)}
                    <Text mt={2}>{post.content}</Text>
                    <Text fontSize="sm" mt={2} color="gray.500">
                      Date Added: {post.date}
                    </Text>
                    <Flex mt={1} align="center" justify="space-between">
                      <Stack direction="row" spacing={2} mr={6}>
                        <Button
                          size="sm"
                          leftIcon={<FaCommentAlt />}
                          variant="outline"
                          colorScheme="blue"
                        >
                          {post.comments?.length || 0} Comments
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
                      <Text>{post.upvotes || 0}</Text>
                    </Flex>
                  </Box>
                ))
              ) : (
                <Text textAlign="center" color="gray.500">
                  No posts found. Create your first post!
                </Text>
              )}
            </VStack>

            {/* Your Profile Section */}
            <VStack
              align="stretch"
              spacing={4}
              p={9}
              bg={profileBg}
              borderRadius="md"
              boxShadow="sm"
            >
              {profile ? (
                <>
                  <Heading size="md">Your Profile</Heading>
                  <Image
                    borderRadius="full"
                    boxSize="100px"
                    src={profile.profileImage || "/default-profile.png"}
                    alt={profile.name}
                    mb={4}
                    alignSelf="center"
                  />
                  <Text fontWeight="bold">{profile.name}</Text>
                  <Text>@{profile.username}</Text>
                  <Text>{profile.bio}</Text>
                  <Button
                    as={Link}
                    to="/settings/edit-profile"
                    colorScheme="blue"
                    variant="outline"
                    mt={4}
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <Text textAlign="center" color="gray.500">
                  Loading profile...
                </Text>
              )}
            </VStack>
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostPage;
