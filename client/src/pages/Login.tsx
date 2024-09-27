import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { FormEvent } from "react";
import Airobot from "/airobot.png"

const Login = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  };

  return (
    <Box width={"100%"} height={"100%"} sx={{ display: "flex", itemsCenter: "center", maxWidth: "1200px", margin: "auto", marginTop: "110px",  }}>
      <Box display={{ md: "flex", sm: "none", xs: "none" }} flex={1}  ml={{xs: "0", md: "40px", lg: "0"}}>
        <img src={Airobot} alt="Rowbot" style={{maxWidth: "500px"}}/>
      </Box>
      <Box
        flex={"1"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"50vh"}
        padding={{ xs: 2, md: 0 }}
        mr={{xs: "0", md: "40px", lg: "0"}}

      >
        <form onSubmit={handleSubmit} className="login-form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={600}
            >
              Login
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
              <CustomizedInput type="email" name="email" label="Email" />
              <CustomizedInput type="password" name="password" label="Password" />
            </Box>
            <Box sx={{ margin: "auto", maxWidth: "450px", width: "100%", mt: 2 }}>
              <Button type="submit"
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  borderRadius: 2,
                  bgcolor: "#00fffc",
                  width: "100%",
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}
                endIcon={<IoIosLogIn />}
              >
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;