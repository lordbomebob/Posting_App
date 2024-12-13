import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaCommentAlt } from "react-icons/fa";
import { db } from "../firebaseConfig";
import { ImageList, ImageListItem } from "@mui/material";

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
  function showImage(images) {
    return images.map((image, index) => (

        <ImageListItem key={index}>

          <Image
          src={image}
          alt={`Post image ${index + 1}`}
          borderRadius="md"
          boxShadow="sm"
          objectFit="cover"
          width="100%"
          />
          
        </ImageListItem>

    ));
  }
  return (
    <Flex
      minHeight="100vh"
      bg={bg}
      color={textColor}
      justifyContent="center"
      p={4}
    >
      <Flex justifyItems={'center'} width="100%">

        {/* Three-Column Layout */}
        <Grid templateColumns="1fr"width="50vw">
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
                
                  {post.content.imageUrlLinks &&
                        post.content.imageUrlLinks.length > 0?
                        <ImageList
                          sx={{
                            width: '100%',
                            maxHeight: 500,         // Set the height limit for scrolling
                            overflowY: 'auto',      // Enable vertical scrolling
                            padding: 2,
                            border: '1px solid #ddd',
                            borderRadius: 2,
                            }}>
                              {showImage(post.content.imageUrlLinks)}
                        </ImageList>
                         :<></>}
                  
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
                      onClick={()=> console.log(post.content.imageUrlLinks)}
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
