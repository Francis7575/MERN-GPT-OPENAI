import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo"
import { useAuth } from "../../context/authContext";
import NavigationLink from "./NavigationLink";
import Box from '@mui/material/Box';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include"
      })
      const data = await response.json();
      console.log(data)
      auth?.setUser(null);
      auth?.setIsLoggedIn(false)
      toast.success("Succesfully Logged out", { id: "userLogout" });
      navigate("/")
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Unable to logout", { id: "userLogout" });
    }
  }

  return (
    <AppBar
      sx={{
        bgcolor: "transparent", position: "static", boxShadow: "none", maxWidth: "1200px",
        margin: "0 auto", mt: { xs: 2, lg: 4 }
      }}
    >
      <Toolbar sx={{ display: "flex", itemsCenter: "center", marginTop: "6" }}>
        <Logo />
        <Box>
          {auth?.isLoggedIn ? (
            <Box sx={{ display: "flex", alignItems: "center", fontSize: { md: "1rem", xs: ".85rem" } }}>
              <NavigationLink
                text="Go To Chat"
                to="/chat"
                bg="#00fffc"
                textColor="black"
              />
              <NavigationLink
                text="logout"
                bg="#51538f"
                textColor="white"
                onClick={handleLogout}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", fontSize: { md: "1rem", xs: ".85rem" } }}>
              <NavigationLink
                text="Login"
                to="/"
                bg="#00fffc"
                textColor="black"
              />
              {/* <NavigationLink
                text="Signup"
                to="/signup"
                bg="#51538f"
                textColor="white"
              /> */}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header