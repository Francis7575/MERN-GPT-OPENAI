import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo"
import { useAuth } from "../context/authContext";
import NavigationLink from "./shared/NavigationLink";
import Box from '@mui/material/Box';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
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
      </Toolbar>
    </AppBar>
  )
}

export default Header