// src/main.jsx
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css"; // Custom CSS for styling
import { mode } from "@chakra-ui/theme-tools";
import { ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

// Theme configuration for Chakra UI
const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark", // Default theme is dark
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

// Extend the default Chakra UI theme
const theme = extendTheme({ config, styles, colors });

// Render the React app
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App /> {/* Main App component */}
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);

// import React, { StrictMode } from "react";
// import ReactDOM from "react-dom/client";
// import { ChakraProvider, extendTheme } from "@chakra-ui/react"; // Import extendTheme from @chakra-ui/react
// import App from "./App.jsx";
// import "./index.css";
// import { mode } from "@chakra-ui/theme-tools";
// import { ColorModeScript } from "@chakra-ui/react";
// import { BrowserRouter } from "react-router-dom";
// import { RecoilRoot } from "recoil";

// const styles = {
//   global: (props) => ({
//     body: {
//       color: mode("gray.800", "whiteAlpha.900")(props),
//       bg: mode("gray.100", "#101010")(props),
//     },
//   }),
// };

// const config = {
//   initialColorMode: "dark",
//   useSystemColorMode: true,
// };

// const colors = {
//   gray: {
//     light: "#616161",
//     dark: "#1e1e1e",
//   },
// };
// // Added a theme which will wrap our entire app
// const theme = extendTheme({ config, styles, colors });

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RecoilRoot>
//       <BrowserRouter>
//         <ChakraProvider theme={theme}>
//           <ColorModeScript initialColorMode={theme.config.initialColorMode} />

//           <App />
//         </ChakraProvider>
//       </BrowserRouter>
//     </RecoilRoot>
//   </StrictMode>
// );
