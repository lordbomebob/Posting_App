import { Box, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";

const CreatePostCard = () => {
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Create Post
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.dark")}
        boxShadow={"lg"}
        p={8}
        w={{ base: "full", sm: "400px" }}
      ></Box>
    </Flex>
  );
};

export default CreatePostCard;
