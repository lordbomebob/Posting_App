// src/components/PostCard.jsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCommentAlt, FaArrowUp, FaArrowDown, FaShare } from "react-icons/fa";

const PostCard = () => {
  const [post, setPost] = useState({
    title: "Dynamic Post Title",
    content: "This content will be updated dynamically.",
    author: "Admin",
    upvotes: 0,
    comments: 0,
  });

  // Example of updating the post dynamically
  const updatePost = () => {
    setPost((prevPost) => ({
      ...prevPost, // Keep the previous values
      upvotes: prevPost.upvotes + 1, // Increment upvotes
      comments: prevPost.comments + 1, // Increment comments
      content: "This is the updated content of the post!", // New content
    }));
  };

  return (
    <Box
      p={4}
      borderWidth="2px"
      borderRadius="lg"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="sm"
      mb={4}
    >
      <Flex justify="space-between">
        <Heading fontSize="xl">{post.title}</Heading>
        <Text fontSize="sm" color="gray.500">
          By {post.author}
        </Text>
      </Flex>
      <Text mt={2} color={useColorModeValue("gray.800", "whiteAlpha.900")}>
        {post.content}
      </Text>
      <Flex mt={4} align="center">
        <IconButton
          icon={<FaArrowUp />}
          aria-label="Upvote"
          variant="ghost"
          colorScheme="teal"
          mr={2}
          onClick={() =>
            setPost((prevPost) => ({
              ...prevPost,
              upvotes: prevPost.upvotes + 1,
            }))
          }
        />
        <Text>{post.upvotes}</Text>
        <IconButton
          icon={<FaArrowDown />}
          aria-label="Downvote"
          variant="ghost"
          colorScheme="red"
          ml={2}
          onClick={() =>
            setPost((prevPost) => ({
              ...prevPost,
              upvotes: prevPost.upvotes - 1,
            }))
          }
        />
        <Button
          leftIcon={<FaCommentAlt />}
          variant="ghost"
          colorScheme="blue"
          ml={4}
          onClick={() =>
            setPost((prevPost) => ({
              ...prevPost,
              comments: prevPost.comments + 1,
            }))
          }
        >
          {post.comments} Comments
        </Button>
        <IconButton
          icon={<FaShare />}
          aria-label="Share"
          variant="ghost"
          colorScheme="blue"
          ml={2}
          onClick={updatePost} // Example: Dynamic content update
        />
      </Flex>
    </Box>
  );
};

export default PostCard;
