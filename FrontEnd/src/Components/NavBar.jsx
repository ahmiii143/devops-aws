import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Slide,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import UserContext from "./UserContext";
// import Sidebar from "./Sidebar"; // Import your Sidebar component

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 20px",
  transition: "padding 0.3s ease-in-out",
  [theme.breakpoints.up("sm")]: {
    padding: "0 40px", // Adjust padding for larger screens
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex", // Change display to flex for larger screens
  },
}));

const Navbar = ({ login }) => {
  const [open, setOpen] = useState(false);
  const { username, userProfilePic, Api_EndPoint, toggleMenu, setToggleMenu } =
    useContext(UserContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const capitalizedUserName =
    username.charAt(0).toUpperCase() + username.slice(1);

  const toggleSidebar = () => {
    // console.log("Toggling sidebar...");
    setToggleMenu(!toggleMenu); // Toggle menu button
  };

  // console.log("Rendering Navbar. toggleMenu:", toggleMenu);

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#B7E9F7", maxWidth: "100%", zIndex: 10 }}
      >
        <StyledToolBar>
          <Box sx={{ flexGrow: 1 }}>
            {/* <Button onClick={toggleSidebar}>
              {toggleMenu ? (
                <CloseIcon sx={{ display: "flex", alignItems: "center" }} />
              ) : (
                <MenuIcon sx={{ display: "flex", alignItems: "center" }} />
              )}
            </Button> */}
            {/* {toggleMenu && <Sidebar />} Render Sidebar conditionally */}
          </Box>
          {isSmallScreen ? (
            <Avatar
              sx={{ width: 40, height: 40 }}
              srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
              onClick={() => setOpen(true)}
            />
          ) : (
            <Icons>
              <Typography variant="span" sx={{ color: "black" }}>
                {capitalizedUserName}
              </Typography>
              <Badge>
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  srcSet={`${Api_EndPoint}/uploads/Images/${userProfilePic}`}
                  onClick={() => setOpen(true)}
                />
              </Badge>
            </Icons>
          )}
        </StyledToolBar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={() => setOpen(false)}
          style={{ margin: 40, width: "200px" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            component={Link}
            to="/home/profile"
            style={{ textAlign: "left", marginRight: 30 }}
          >
            My Account
          </MenuItem>
          <MenuItem
            component={Link}
            to="/"
            onClick={() => {
              login(false);
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
