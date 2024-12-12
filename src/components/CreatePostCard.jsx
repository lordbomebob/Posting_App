import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";
import { ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
const CreatePostCard = () =>{
    const [inputImageLink, setInputImageLink]= useState('')
    function handleImageInput(e){
        setInputImageLink(e.target.value)
    }
    // Validate URL
    const [error, setError] = useState('');
    function isValidURL(url) {
        try {
            new URL(url); // Throws an error if invalid
            return true;
        } catch {
            return false;
        }
    }
    const [imageLinks,setImageLinks]= useState([])
    //add image link to list
    function addImageLink(target){
        if (!isValidURL(target)) {
            setError('Please enter a valid URL.');
            console.error(error);
            return;
        }
        console.log(imageLinks)
        //setImageLinks([...imageLinks,{image: target}])
        //setPostData({...postData,images:imageLinks})
        setImageLinks((prevImageLinks) => {
            const updatedLinks = [...prevImageLinks,target];
            setPostData((prevPostData) => ({
                ...prevPostData,
                content:{
                    ...prevPostData.content,
                    imageUrlLinks: updatedLinks,
                }
            }));
            return updatedLinks;
        });
    }
    //subtract image link based on index
    function subImageLink(index){
        //console.log(imageLinks.length)
        //const newImageLinks= imageLinks.filter((_,i)=>i !== index)
        //setImageLinks([...newImageLinks])
        ////might not work becuase of delay
        //setPostData({...postData,images:imageLinks})
        setImageLinks((prevImageLinks) => {
            const newImageLinks = prevImageLinks.filter((_, i) => i !== index);
            setPostData((prevPostData) => ({
                ...prevPostData,
                content:{
                    ...prevPostData.content,
                    imageUrlLinks: newImageLinks,
                }
            }));
            return newImageLinks;
        });
    }
    //function should add to post component
    function showImage(){
        
        const imageListItem=imageLinks.map((item,index)=>{

            return <ImageListItem key={index}><img src={item} onClick={()=>subImageLink(index)}></img></ImageListItem>
        })
        return imageListItem
    }
    //clear input
    function clear(){
        setInputImageLink('')
    }

    const [postData,setPostData]= useState({
        userId: "userID",// localStorage.user.uid
        title:'',
        content:{
            text:'',
            imageUrlLinks:[]
        },
        timestamp: new Date,
        likes:[],
        comments:[]
    })


    //handle submiting post
    function handleSubmit(){
        //api post
        console.log(postData)
        //upsertPost(_,postData)
    }

    return(
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
                        <FormLabel>Title</FormLabel>
                        <Input placeholder='Enter Title' value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Content</FormLabel>
                        <Textarea placeholder="Content" value={postData.content.text} onChange={(e)=>setPostData({...postData,content:{...postData.content,text:e.target.value}})}></Textarea>
                        
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
                    <Button onClick={()=>handleSubmit()}
                        loadingText="Submitting"
                        size="lg"
                        bg={useColorModeValue("gray.600", "gray.700")}
                        color={"white"}
                        _hover={{
                        bg: useColorModeValue("gray.700", "gray.800"),
                        }}>Post</Button>
                </Stack>
            </Box>
        </Flex> 
    )
}
export default CreatePostCard