import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getLocalUid } from "../services/authService";

const OnBoardCard = () => {
    const navigate = useNavigate()
    const [userID,setUserID]= useState(getLocalUid())//userId: "", // Unique ID for the user (Firestore document ID) probally token from local storage
    const [userProfile,setUserProfile]= useState({
        username: "", // The username of the user
        fullName: "", // Full name of the user
        bio: "", // Short biography
                    // URL of the profile picture
        profilePicUrl: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg", 
        joiningDate: new Date, // Date the user joined
        posts: [], // Array of post IDs created by this user
        likedPosts: [], // Array of post IDs liked by this user
        savedPosts: [], // Array of post IDs saved by this user
        repliedPosts: [], // Array of post IDs where this user commented on
        reposts: [] // Array of post IDs that the user reposted
    })
    const handleSubmit = () =>{
        if(!isValidURL(userProfile.profilePicUrl)){
            console.warn("invalid url")
            alert("invalid profile url")
            return
        }
        //upsertUser(userID,userProfile)
        console.log('handlesubmit after url check', userProfile)
        alert("info saved")
        navigate('/home')
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
                    <HStack>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Full Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={userProfile.fullName}
                                        onChange={(e)=>setUserProfile({...userProfile,fullName:e.target.value})}
                                    />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>User Name</FormLabel>
                                <Input
                                  type="text"
                                  value={userProfile.username}
                                  onChange={(e)=>setUserProfile({...userProfile,username:e.target.value})}
                                />
                            </FormControl>
                        </Box>
                    </HStack>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea placeholder="Bio" value={userProfile.bio} onChange={(e)=>setUserProfile({...userProfile,bio:e.target.value})}></Textarea>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Profile Picture</FormLabel>
                        <Input placeholder='Provide link of picture' value={userProfile.profilePicUrl} 
                            onChange={(e)=>setUserProfile({...userProfile,profilePicUrl:e.target.value})} marginBottom={3}></Input>
                        <HStack justifyContent={'space-around'}>
                            <Button 
                                onClick={()=>setUserProfile({...userProfile,profilePicUrl:"https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"})}
                                >Default Picture</Button>
                            <Button 
                                onClick={()=>setUserProfile({...userProfile,profilePicUrl:""})}
                                textColor={'red'}
                                >Clear Link</Button>
                        </HStack>
                    </FormControl>
                    <Image
                        src={userProfile.profilePicUrl}
                        boxSize="150px"
                        borderRadius="full"
                        
                        fit="cover"
                        alt="profile pic"
                        alignSelf={"center"}>
                    </Image>
                    
                    <Button onClick={()=>handleSubmit()} //disabled
                        loadingText="Submitting"
                        size="lg"
                        bg={useColorModeValue("gray.600", "gray.700")}
                        color={"white"}
                        _hover={{
                        bg: useColorModeValue("gray.700", "gray.800"),
                        }}>Save</Button>
                    <Button onClick={()=>console.log(userID)}>userid</Button>
                </Stack>
            </Box>
        </Flex> 
    )
}

export default OnBoardCard