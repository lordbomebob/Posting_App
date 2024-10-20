import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react"; // Import extendTheme from @chakra-ui/react
import App from "./App.jsx";
import "./index.css";
import { mode } from "@chakra-ui/theme-tools";
import { ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};
// Added a theme which will wrap our entire app
const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
