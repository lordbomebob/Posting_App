import React, { useState } from 'react'

export const EditProfile = () => {
    const [userProfileData,setUserProfileData]= useState({
        publicName:'',
        description:'',
        profileImage:''
    })
  return (
    <Flex align={"center"} justify={"center"} display={"flex"} flexDirection={"column"}>
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
            >
                <Stack >
                    <FormControl isRequired>
                        <FormLabel>Public Name</FormLabel>
                        <Input placeholder='Public Username' value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Content</FormLabel>
                        <Textarea placeholder="Content" value={postData.content} onChange={(e)=>setPostData({...postData,content:e.target.value})}></Textarea>
                        
                    </FormControl>
                    <FormControl>
                        <FormLabel>Images Link</FormLabel>
                        <Input value={inputImageLink} onChange={handleImageInput} marginBottom={3}></Input>

                        <Stack display={"flex"} flexDirection={"row"}>
                            <Button color={'green'} onClick={()=> addImageLink(inputImageLink)}>Add Image Link</Button>
                            <Button color={'red'} onClick={()=> clear()}>Clear Link</Button>
                        </Stack>
                    </FormControl>
                    <Heading size={'lg'}>Images Added</Heading>
                    <Heading size={'sm'}>Click Image to Delete</Heading>
                    <ImageList sx={{
                                    width: '100%',
                                    maxHeight: 300,         // Set the height limit for scrolling
                                    overflowY: 'auto',      // Enable vertical scrolling
                                    padding: 2,
                                    border: '1px solid #ddd',
                                    borderRadius: 2,
                                    }}>
                            {showImage()}
                    </ImageList>
                    <Button onClick={()=>handleSubmit()}>Post</Button>
                </Stack>
            </Box>
        </Flex> 
  )
}
