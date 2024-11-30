// src/App.jsx
import { Container } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PostPage from "./pages/PostPage";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";
import Security from "./pages/Settings/Security";
import Privacy from "./pages/Settings/Privacy";

// Main App component
function App() {
  return (
    <Container
      maxW="620px"
      direction="column"
      minHeight="100vh" // Ensures the app takes the full height of the viewport
    >
      {/* Header Component */}
      <Header />

      <Flex
        flex="1"
        justifyContent="center"
        alignItems="flex-start"
        width="100%"
      >
        <Routes>
          {/* Authentication Page */}
          <Route path="/" element={<AuthPage />} />
          {/* User Post Page */}
          <Route path="/:username/post/:pid" element={<PostPage />} />
          {/* Search Page */}
          <Route path="/search" element={<SearchPage />} />
          {/* Settings Hub Page */}
          <Route path="/settings" element={<Settings />} />
          {/* Individual Settings Pages */}
          <Route path="/settings/security" element={<Security />} />
          <Route path="/settings/privacy" element={<Privacy />} />
        </Routes>
      </Flex>
    </Container>
  );
}

export default App;
