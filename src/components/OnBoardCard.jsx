import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from 'react';

const OnBoardCard = () => {
    const [userProfile,setUserProfile]= useState({
        username:"",
        profilePic:"",
        bio:"",
        userUpvote:[]
    })
    const handleSubmit = () =>{
        console.log(userProfile)
    }
    function isValidURL(url) {
        try {
            new URL(url); // Throws an error if invalid
            return true;
        } catch {
            return false;
        }
    }
  return (
    <Flex align={"center"} justify={"center"} display={"flex"} flexDirection={"column"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                    Create Profile
                </Heading>
            </Stack>
            <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.dark")}
                boxShadow={"lg"}
                p={8}
                w={{ base: "full", sm: "400px" }}
            >
                <Stack >
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input placeholder='Enter Username' value={userProfile.username} onChange={(e)=>setUserProfile({...userProfile,username:e.target.value})}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea placeholder="Bio" value={userProfile.bio} onChange={(e)=>setUserProfile({...userProfile,bio:e.target.value})}></Textarea>
                        <FormLabel>Profile Picture</FormLabel>
                        <Input placeholder='Provide link of picture' value={userProfile.profilePic} onChange={(e)=>setUserProfile({...userProfile,profilePic:e.target.value})} marginBottom={3}></Input>
                    </FormControl>
                    <Image
                        src={userProfile.profilePic}
                        boxSize="150px"
                        borderRadius="full"
                        
                        fit="cover"
                        alt="profile pic"
                        alignSelf={"center"}></Image>
                    <Button onClick={()=>handleSubmit()}
                        loadingText="Submitting"
                        size="lg"
                        bg={useColorModeValue("gray.600", "gray.700")}
                        color={"white"}
                        _hover={{
                        bg: useColorModeValue("gray.700", "gray.800"),
                        }}>Save</Button>
                </Stack>
            </Box>
        </Flex> 
    )
}

export default OnBoardCard