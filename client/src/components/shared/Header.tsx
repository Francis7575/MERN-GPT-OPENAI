import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo"
import { useAuth } from "../../context/authContext";
import NavigationLink from "./NavigationLink";
import Box from '@mui/material/Box';

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "transparent", position: "static", boxShadow: "none", maxWidth: "1200px",
        margin: "0 auto", padding: { xs: "10px", md: "16px", lg: "0" }, mt: { xs: 2, lg: 4 },
      }}
    >
      <Toolbar sx={{ display: "flex", itemsCenter: "center", marginTop: "6" }}>
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
                to="/login"
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