// src/pages/AuthPage.jsx
import React, { useState } from "react";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";

// Authentication and sample content page
const AuthPage = () => {
  const [authScreenState, setAuthScreenState] = useState("login");

  return (
    <>
      {authScreenState === "login" ? (
        <LoginCard setAuthScreenState={setAuthScreenState} />
      ) : (
        <SignupCard setAuthScreenState={setAuthScreenState} />
      )}
    </>
  );
};

export default AuthPage;
