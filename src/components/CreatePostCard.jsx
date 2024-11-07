import { Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,} from "@chakra-ui/react";
const CreatePostCard = () =>{
    
    
    return(
        <Flex align={"center"} justify={"center"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                    Create Post
                </Heading>
            </Stack>
            <Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.dark")}
                    boxShadow={"lg"}
                    p={8}
                    w={{ base: "full", sm: "400px" }}
                >
                    <Stack>
                        <FormControl isRequired>
                            <FormLabel>Post Title</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Content</FormLabel>
                            <Input type="text" />
                        </FormControl>
                    </Stack>
                </Box>
            </Stack>
            

        </Flex> 
    )
}

export default CreatePostCard;