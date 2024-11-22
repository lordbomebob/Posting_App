// src/pages/AuthPage.jsx
import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";
import authScreenAtom from "../atoms/authAtom";

// Authentication and sample content page
const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;

// import { useRecoilValue } from "recoil";
// import LoginCard from "../components/LoginCard";
// import SignupCard from "../components/SignupCard";
// import authScreenAtom from "../atoms/authAtom";

// // Authentication Page
// const AuthPage = () => {
//   const authScreenState = useRecoilValue(authScreenAtom);
//   return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
// };

// export default AuthPage;
