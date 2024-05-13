import React, { useState } from "react";
import { Box, ThemeProvider, createTheme, useTheme } from "@mui/material";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import BirthdayAlert from "./BirthdayAlert";

function Home({ login }) {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const theme = useTheme();

  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === "/login";
  const isSignUpPage = currentPath === "/signup";
  const isMediumOrSmallerScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="bg-glassBlue bg-opacity-70 text-primary min-h-screen flex flex-col pt-20 bg-[#DBF3FA]">
        <div className="flex justify-center">
          <BirthdayAlert />
        </div>
        {!isLoginPage && !isSignUpPage && (
          <>
            <Box
              className={
                isMediumOrSmallerScreen
                  ? "bg-transparent fixed top-20 left-0 w-full"
                  : "bg-transparent"
              }>
              <Navbar login={login} />
            </Box>
            <Box
              className={
                isMediumOrSmallerScreen
                  ? "bg-transparent fixed top-20 left-0 w-full"
                  : "bg-transparent"
              }>
              <Sidebar mode={mode} setMode={setMode} />
            </Box>
          </>
        )}
        <Box
          flex="1"
          p={3}
          ml={isMediumOrSmallerScreen ? 0 : 4}
          className="bg-transparent">
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
