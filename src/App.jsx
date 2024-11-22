// src/App.jsx
import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/Search";
import Settings from "./pages/Settings";
import Security from "./pages/Settings/Security";
import EditProfile from "./pages/Settings/EditProfile";
import Privacy from "./pages/Settings/Privacy";

import { useColorModeValue } from "@chakra-ui/react";

// Main App component
function App() {
  return (
    <Flex
      direction="column"
      minHeight="100vh" // Ensures the app takes the full height of the viewport
      bg={useColorModeValue("white", "gray.dark")} // Sets the background color for the whole app
    >
      {/* Header Component */}
      <Header />

      {/* Main content area */}
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="flex-start"
        bg="black"
        width="100%"
      >
        <Routes>
          {/* Authentication Page */}
          <Route path="/" element={<AuthPage />} />
          {/* <Route path="/auth" element={<AuthPage />} /> */}
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/edit-profile" element={<EditProfile />} />
          <Route path="/settings/privacy" element={<Privacy />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
