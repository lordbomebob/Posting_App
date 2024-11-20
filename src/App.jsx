// src/App.jsx
import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import AuthPage from "./pages/AuthPage";

// Main App component
function App() {
  return (
    <Flex
      direction="column"
      minHeight="100vh" // Ensures the app takes the full height of the viewport
      bg="black" // Sets the background color for the whole app
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
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
