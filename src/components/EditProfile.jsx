import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
const EditProfile = () => {
    const [userProfileData,setUserProfileData]= useState({
        publicName:'',
        description:'',
        profileImage:''
    })

    //handle updating profile
    const handleSubmit=()=>{

    }
  return (
    <Flex align={"center"} justify={"center"} display={"flex"} flexDirection={"column"}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                    Edit Profile
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
                        <FormLabel>Public Name</FormLabel>
                        <Input placeholder='Public Username' value={userProfileData.publicName} onChange={(e)=>setUserProfileData({...userProfileData,publicName:e.target.value})}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Profile Image</FormLabel>
                        <Input placeholder='Image Link' value={userProfileData.profileImage} onChange={(e)=>setUserProfileData({...userProfileData,profileImage:e.target.value})}></Input>
                        <Image
                            justifySelf={'center'}
                            src={userProfileData.profileImage}
                            boxSize="150px"
                            borderRadius="full"
                            
                            fit="cover"
                            alt={userProfileData.profileImage || 'missing Image'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder='Profile Description' value={userProfileData.description} onChange={(e)=>setUserProfileData({...userProfileData,description:e.target.value})}></Input>
                    </FormControl>
                    

                    <Button onClick={()=>handleSubmit()}
                        loadingText="Submitting"
                        size="lg"
                        bg={useColorModeValue("gray.600", "gray.700")}
                        color={"white"}
                        _hover={{
                        bg: useColorModeValue("gray.700", "gray.800"),
                        }}>Update</Button>
                </Stack>
            </Box>
        </Flex> 
  )
}
export default EditProfile