// src/App.jsx
import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import PostPage from "./pages/PostPage";

// Container from chakra-ui wraps our app content in the center
//Routes for declaring url routes to postpage and profile page
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
          <Route path="/settings/edit-profile" element={<EditProfile />} />
          <Route path="/settings/privacy" element={<Privacy />} />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default App;
