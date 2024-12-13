// src/App.jsx
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Container, IconButton, useColorMode } from "@chakra-ui/react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useEffect } from "react";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import CreatePostPage from "./pages/CreatePostPage";
import OnBoardPage from "./pages/OnBoardPage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";
import EditProfile from "./pages/Settings/EditProfile";
import Privacy from "./pages/Settings/Privacy";
import Security from "./pages/Settings/Security";
import UserPage from "./pages/UserPage";
import { getCurrentUserId } from "./services/authService";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation(); // Access current location

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId && location.pathname === "/") {
      // Only navigate to /home if the current path is "/"
      navigate("/home");
    }
  }, [navigate, location.pathname]);

  return (
    <Container maxW="620px">
      <Header />
      <IconButton
        icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        display={"flex"}
        justifySelf={"right"}
        position={"fixed"}
        bottom="20px"
        right="20px"
      />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/onboard" element={<OnBoardPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/create" element={<CreatePostPage />} />
        <Route path="/home" element={<PostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/privacy" element={<Privacy />} />
        <Route path="/settings/edit-profile" element={<EditProfile />} />
      </Routes>
    </Container>
  );
}

export default App;
