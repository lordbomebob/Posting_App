import { Box, Button, Image, VStack, useColorModeValue } from "@chakra-ui/react";
import React from 'react';
import { Link } from "react-router-dom";
import ConfirmSignOut from "./ConfirmSignOut";
import DialogButton from "./DialogButton";
const SideNavBar = () => {
    // Dynamic color modes
  const bg = useColorModeValue("gray.100", "#101010");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const profileBg = useColorModeValue("white", "gray.800");
  return (
    <>
    {/* Sidebar Navigation */}
    <Box
    as="nav"
    width="200px"
    p={1}
    bg={bg}
    boxShadow="md"
    height="100vh"
    position={"fixed"}
    top="sm"
    left="0"
  >
    <VStack spacing={4} align="center">
        <Image
            cursor="pointer"
            alt="logo"
            w={["30", "30%", "20%"]} // Responsive width for mobile, tablet, and desktop
            src={useColorModeValue("/dark-logo.svg","/light-logo.svg")} // Dynamic logo based on theme
            onClick={()=>navigate('/home')} // Click to toggle light/dark mode
            
      />
      <Button
        as={Link}
        to="/home"
        variant="ghost"
        color={textColor}
        w="full"
      >
        Home
      </Button>
      <Button
        as={Link}
        to="/search"
        variant="ghost"
        color={textColor}
        w="full"
      >
        Search
      </Button>
      <Button
        as={Link}
        to="/settings"
        variant="ghost"
        color={textColor}
        w="full"
      >
        Settings
      </Button>
        <DialogButton 
        buttonName={"Log Out"}
        variant={'outline'}
        buttonTextColor={'red'}
        >
            <ConfirmSignOut/>
        </DialogButton>
    </VStack>
  </Box>
  </>
  )
}

export default SideNavBar