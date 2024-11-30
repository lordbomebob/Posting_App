// src/components/PostCard.jsx
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp, FaCommentAlt, FaShare } from "react-icons/fa";

const PostCard = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    upvotes: 0,
    comments: 0,
  });

  return (
    <Box
      p={4}
      borderWidth="1px"
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
        />
        <Text>{post.upvotes}</Text>
        <IconButton
          icon={<FaArrowDown />}
          aria-label="Downvote"
          variant="ghost"
          colorScheme="red"
          ml={2}
        />
        <Button
          leftIcon={<FaCommentAlt />}
          variant="ghost"
          colorScheme="blue"
          ml={4}
        >
          {post.comments} Comments
        </Button>
        <IconButton
          icon={<FaShare />}
          aria-label="Share"
          variant="ghost"
          colorScheme="blue"
          ml={2}
        />
      </Flex>
    </Box>
  );
};

export default PostCard;
