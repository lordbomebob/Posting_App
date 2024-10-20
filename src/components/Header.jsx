import { Flex, Image, useColorMode } from "@chakra-ui/react";

// Created a header component to toggle the light and dark theme
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb="12">
      <Image
        cursor={"pointer"}
        alt="logo"
        w={["20%", "15%", "10%"]} // For mobile, tablet, desktop respectively - adjusts width based on percentage of container
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
