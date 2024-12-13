// src/App.jsx
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Container, IconButton, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import AuthPage from "./pages/AuthPage";
import OnBoardPage from "./pages/OnBoardPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";
import EditProfile from "./pages/Settings/EditProfile"; // Import EditProfile component
import Privacy from "./pages/Settings/Privacy";
import Security from "./pages/Settings/Security";
import { getCurrentUserId } from "./services/authService"; // Import helper function

// Container from chakra-ui wraps our app content in the center
// Routes for declaring URL routes to post page and profile page
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      navigate("/home"); // Navigate to home if user is already logged in
    }
  }, [navigate]);

  return (
    <Container maxW="620px">
      <Header />
      {getCurrentUserId()?<SideNavBar/>:<></>/*if logged in show more ui  */}
      <IconButton
        icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        display={"flex"}
        justifySelf={"right"}
        position={"fixed"}
        bottom="25px"
        left="25px"
      />
      <Routes>
        {/* login and signup page */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/onboard" element={<OnBoardPage/>}/>

        {/*select user */}
        <Route path="/user/:username" element={<ProfilePage />} />
        {/* User personal Home Page */}
        <Route path="/home" element={<PostPage />} />
        {/* Search Page */}
        <Route path="/search" element={<SearchPage />} />
        {/* Settings Hub Page */}
        <Route path="/settings" element={<Settings />} />
        {/* Individual Settings Pages */}
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/privacy" element={<Privacy />} />
        <Route path="/settings/edit-profile" element={<EditProfile />} />
      </Routes>
    </Container>
  );
}

export default App;
