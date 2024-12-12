import React from "react";
import { Box, Button, Heading, Text, VStack, HStack, useColorModeValue } from "@chakra-ui/react";
/*
for a single post
use post.json for json reference
use single prop
use useColorModeValue("white", "gray.dark") for color scheme

layout:

Username (small)
Big title
content: text
image Component(add later, leave a space for it)
tiny time stamp
[like button, comment button]
comment component(add later, leave it alone)

*/
const PostCard = ({post}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("black", "white");
  return (
    /*<div className="post-card">
      <h3>Post Title</h3>
      <p>This is a brief description of the post.</p>
      <button>Read More</button>
    </div>*/
    <Box
      bg={bgColor}
      color={textColor}
      borderRadius="md"
      p={6}
      boxShadow="lg"
      mb={6}
      maxW="600px"
      mx="auto"
    >

      <Text fontSize="sm" fontWeight="bold" mb={2}>
        {post.username}
      </Text>

      <Heading size="md" mb={4}>
        {post.title}
      </Heading>

      <Text fontSize="md" mb={4}>
        {post.content}
      </Text>

      <Box
        bg="gray.300"
        height="200px"
        borderRadius="md"
        mb={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="sm" color="gray.600">
          [Image Placeholder]
        </Text>

        

       
   

      </Box>

      <Text fontSize="xs" color="gray.500" mb={4}>
        {post.timestamp}
        </Text>

      <HStack spacing={4}>
        <Button colorScheme="red" size="sm">
          Like
        </Button>

        <Button colorScheme="blue" size="sm">
          Comment
        </Button>
      </HStack>
    </Box>
  );
};

export default PostCard;
