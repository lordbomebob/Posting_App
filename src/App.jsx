// src/App.jsx
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Container, IconButton, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import FirebaseTester from './components/FirebaseTester';
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import AuthPage from "./pages/AuthPage";
import OnBoardPage from "./pages/OnBoardPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";
import EditProfile from "./pages/Settings/EditProfile";
import Privacy from "./pages/Settings/Privacy";
import Security from "./pages/Settings/Security";
import TrendingPage from "./pages/TrendingPage";
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
        <Route path="/" element={<AuthPage />} />
        <Route path="/onboard" element={<OnBoardPage/>}/>

        {/*select user */}
        <Route path="/user/:username" element={<ProfilePage />} />
        {/* User personal Home Page */}
        <Route path="/home" element={<PostPage />} />
        <Route path="/trending" element={<TrendingPage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/privacy" element={<Privacy />} />
        <Route path="/settings/edit-profile" element={<EditProfile />} />
        <Route path='/test' element={<FirebaseTester/>}/>{/** test only remove later */}
      </Routes>
    </Container>
  );
}

export default App;
