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
import { Link } from "react-router-dom";
import { FaArrowUp, FaArrowDown, FaCommentAlt } from "react-icons/fa";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TrendingPage = () => {
  const [posts, setPosts] = useState([]);

  // Always define hooks at the top level in the same order
  const bg = useColorModeValue("gray.100", "#101010");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      try {
        const postsRef = collection(db, "Posts");
        const q = query(
          postsRef,
          where("timestamp", ">=", oneDayAgo),
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const trendingPosts = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              likesCount: Array.isArray(data.likes) ? data.likes.length : 0, // Safely count likes
            };
          })
          .sort((a, b) => b.likesCount - a.likesCount);

        setPosts(trendingPosts);

        // Log fetched posts to the browser console
        console.log("Trending Posts:", trendingPosts);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []); // Ensure this hook always runs without conditions

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
            <Button
              as={Link}
              to="/home"
              variant="ghost"
              color={textColor}
              w="full"
            >
              Home
            </Button>
            <Button
              as={Link}
              to="/search"
              variant="ghost"
              color={textColor}
              w="full"
            >
              Search
            </Button>
            <Button
              as={Link}
              to="/settings"
              variant="ghost"
              color={textColor}
              w="full"
            >
              Settings
            </Button>
          </VStack>
        </Box>

        {/* Three-Column Layout */}
        <Grid templateColumns="1.5fr 2fr 1.5fr" gap={4} ml={6} width="50%">
          {/* Trending Posts Section */}
          <VStack
            align="stretch"
            spacing={4}
            p={3}
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="md"
          >
            <Heading size="md">Trending Posts</Heading>
            {posts.map((post) => (
              <Box
                key={post.id}
                p={4}
                bg={useColorModeValue("gray.50", "gray.600")}
                borderRadius="md"
                boxShadow="sm"
              >
                <Heading size="sm" mb={2}>
                  {post.content?.text || "No Content Available"}
                </Heading>
                <Text>By {post.userId || "Unknown User"}</Text>
                <Text mt={2}>{post.content?.text || ""}</Text>
                {post.content?.imageUrlLinks?.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Post image ${index + 1}`}
                    mt={2}
                    borderRadius="md"
                  />
                ))}
                <Text fontSize="sm" mt={2} color="gray.500">
                  Posted on:{" "}
                  {post.timestamp
                    ? new Date(post.timestamp.seconds * 1000).toLocaleString()
                    : "Unknown Date"}
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
                  </Stack>
                  <IconButton
                    icon={<FaArrowUp />}
                    aria-label="Upvote"
                    variant="ghost"
                    colorScheme="green"
                  />
                  <Text>{post.likesCount}</Text>
                  <IconButton
                    icon={<FaArrowDown />}
                    aria-label="Downvote"
                    variant="ghost"
                    colorScheme="red"
                  />
                </Flex>
              </Box>
            ))}
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default TrendingPage;
