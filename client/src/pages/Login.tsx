import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { ChangeEvent, FormEvent, useState } from "react";
import Airobot from "/airobot.png"
import { LoginForm } from "../types/types";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Login = () => {
  const auth = useAuth();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })

  const handleLogin = async (formData: LoginForm) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
      console.log("formData:", formData);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      toast.loading("Signing In", { id: "login" });
      const data = await handleLogin(formData);
      if (data) {
        auth?.setUser({ email: data.email, name: data.name });
        auth?.setIsLoggedIn(true);
        toast.success("Signed In Successfully", { id: "login" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box width={"100%"} height={"100%"} sx={{ display: "flex", itemsCenter: "center", maxWidth: "1200px", margin: "auto", marginTop: "110px", }}>
      <Box display={{ md: "flex", sm: "none", xs: "none" }} flex={1} ml={{ xs: "0", md: "40px", lg: "0" }}>
        <img src={Airobot} alt="Rowbot" style={{ maxWidth: "500px" }} />
      </Box>
      <Box
        flex={"1"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"50vh"}
        padding={{ xs: 2, md: 0 }}
        mr={{ xs: "0", md: "40px", lg: "0" }}

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
              <CustomizedInput type="email" name="email" label="Email" onChange={handleChange} value={formData.email}/>
              <CustomizedInput type="password" name="password" label="Password" onChange={handleChange} value={formData.password} />
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