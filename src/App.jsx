import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";

// Container from chakra-ui wraps our app content in the center
//Routes for declaring url routes to postpage and profile page
function App() {
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  );
}

export default App;
