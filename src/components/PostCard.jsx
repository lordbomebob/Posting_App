// src/components/PostCard.jsx
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCommentAlt, FaArrowUp, FaArrowDown, FaShare } from "react-icons/fa";

// PostCard component to display each post
const PostCard = ({ title, content, author, upvotes, comments }) => {
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
        <Heading fontSize="xl">{title}</Heading>
        <Text fontSize="sm" color="gray.500">
          By {author}
        </Text>
      </Flex>
      <Text mt={2} color={useColorModeValue("gray.800", "whiteAlpha.900")}>
        {content}
      </Text>
      <Flex mt={4} align="center">
        <IconButton
          icon={<FaArrowUp />}
          aria-label="Upvote"
          variant="ghost"
          colorScheme="teal"
          mr={2}
        />
        <Text>{upvotes}</Text>
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
          {comments} Comments
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
