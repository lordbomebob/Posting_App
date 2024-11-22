// src/components/ThreadComments.jsx
import {
  Box,
  Text,
  Stack,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

// A single comment with nested replies
const Comment = ({ author, content, replies }) => {
  return (
    <Box
      p={3}
      bg={useColorModeValue("gray.100", "gray.700")}
      borderRadius="md"
      mt={2}
    >
      <Stack direction="row" align="center">
        <Avatar size="sm" />
        <Text fontWeight="bold">{author}</Text>
      </Stack>
      <Text mt={2}>{content}</Text>
      <Button size="sm" variant="link" colorScheme="blue" mt={2}>
        Reply
      </Button>
      {replies && replies.length > 0 && (
        <Box mt={4} pl={6} borderLeft="1px" borderColor="gray.300">
          {replies.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Comment;
