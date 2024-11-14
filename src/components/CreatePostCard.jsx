import { Flex, Heading, Stack, Box, useColorModeValue, FormControl, FormLabel, Input, Text, Textarea, Button} from "@chakra-ui/react";
import { ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
const CreatePostCard = () =>{
    const [inputImageLink, setInputImageLink]= useState('')
    function handleImageInput(e){
        setInputImageLink(e.target.value)
    }
    const [imageLinks,setImageLinks]= useState([])
    //add image link to list
    function addImageLink(target){
        setImageLinks([...imageLinks,{image: target}])  
    }
    //subtract image link based on index
    function subImageLink(index){
        console.log(imageLinks.length)
        const newImageLinks= imageLinks.filter((_,i)=>i !== index)
        setImageLinks([...newImageLinks])
    }
    //function should add to post component
    function showImage(){
        
        const imageListItem=imageLinks.map((item,index)=>{

            return <ImageListItem key={index}><img src={item.image} onClick={()=>subImageLink(index)}></img></ImageListItem>
        })
        return imageListItem
    }

    function clear(){
        setInputImageLink('')
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
                        <Input></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Content</FormLabel>
                        <Textarea></Textarea>
                        
                    </FormControl>
                    <FormControl>
                        <FormLabel>Images</FormLabel>
                        <Input value={inputImageLink} onChange={handleImageInput}></Input>
                        <Stack display={"flex"} flexDirection={"row"}>
                            <Button color={'green'} onClick={()=> addImageLink(inputImageLink)}>Add Image Link</Button>
                            <Button color={'red'} onClick={()=> clear()}>Clear Link</Button>
                        </Stack>
                    </FormControl>
                    <Heading>Images Added</Heading>
                    <ImageList>
                            {showImage()}
                    </ImageList>
                </Stack>
            </Box>
        </Flex> 
    )
}

export default CreatePostCard;