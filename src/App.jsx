// src/App.jsx
import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";
import Privacy from "./pages/Settings/Privacy";
import Security from "./pages/Settings/Security";
import UserPage from "./pages/UserPage";

// Container from chakra-ui wraps our app content in the center
//Routes for declaring url routes to postpage and profile page
function App() {
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path='/:username/create' element={<CreatePostPage/>} />
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
    </Container>
  );
}

export default App;
