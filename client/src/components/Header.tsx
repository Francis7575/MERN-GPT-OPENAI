import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo"
<<<<<<< HEAD
import { useAuth } from "../context/authContext";
import NavigationLink from "./shared/NavigationLink";
import Box from '@mui/material/Box';

const Header = () => {
  const auth = useAuth();
=======

const Header = () => {
>>>>>>> d738dd7d0b2d77d3037aeb7e48b76406f4db92bd
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
<<<<<<< HEAD
        <Box>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                text="Go To Chat"
                to="/chat"
                bg="#00fffc"
                textColor="black"
              />
              <NavigationLink
                text="logout"
                to="/"
                bg="#51538f"
                textColor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                text="Login"
                to="/login"
                bg="#00fffc"
                textColor="black"
              />
              <NavigationLink
                text="Signup"
                to="/signup"
                bg="#51538f"
                textColor="white"
              />
            </>
          )}
        </Box>
=======
>>>>>>> d738dd7d0b2d77d3037aeb7e48b76406f4db92bd
      </Toolbar>
    </AppBar>
  )
}

export default Header