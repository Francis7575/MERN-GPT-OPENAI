import { SiGnuprivacyguard } from "react-icons/si";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SignupForm } from "../types/types";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const [formData, setFormData] = useState<SignupForm>({
    fullName: '',
    email: '',
    password: ''
  })

  const handleSignup = async (formData: SignupForm) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })

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
      const data = await handleSignup(formData);
      console.log(data)
      if (data) {
        auth?.setUser({ email: data.email, fullName: data.fullName });
        auth?.setIsLoggedIn(true);
        toast.success("Signed Up Successfully", { id: "login" })
        setFormData({ fullName: '', email: '', password: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/login")
    }
  }, [auth?.isLoggedIn])

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
        <img src="airobot.png" alt="Rowbot" style={{ maxWidth: "500px" }} />
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
              Signup
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "20px", maxWidth: "450px", margin: "auto", width: "100%" }}>
              <CustomizedInput type="name" name="fullName" label="Fullname" onChange={handleChange} value={formData.fullName} />
              <CustomizedInput type="email" name="email" label="Email" onChange={handleChange} value={formData.email} />
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
                endIcon={<SiGnuprivacyguard />}
              >
                Signup
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;