import { Image } from '@chakra-ui/react';
import { ImageListItem,ImageList } from '@mui/material';
import React from 'react'

const ImageListFormatted = ({listOfImage}) => {
    function showImage(images) {
        return images.map((image, index) => (
    
            <ImageListItem key={index}>
    
              <Image
              src={image}
              alt={`Post image ${index + 1}`}
              borderRadius="md"
              boxShadow="sm"
              objectFit="cover"
              width="100%"
              />
              
            </ImageListItem>
    
        ));
      }
  return (
    <ImageList
        sx={{
          width: '100%',
          maxHeight: 500,         // Set the height limit for scrolling
          overflowY: 'auto',      // Enable vertical scrolling
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          }}>
            {showImage(listOfImage)}
    </ImageList>
  )
}

export default ImageListFormatted