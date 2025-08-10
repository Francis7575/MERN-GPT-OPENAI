import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LoginForm } from "../types/types";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginForm>({
    email: 'testuser@gmail.com',
    password: '123456'
  })
  const [errors, setErrors] = useState<LoginForm>({});

  const formValidation = () => {
    const { email, password } = formData;
    const newErrors: LoginForm = {};

    if (email) {
      if (!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      newErrors.email = 'Email cannot be empty';
    }

    if (!password) {
      newErrors.password = 'Password cannot be empty';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  const handleLogin = async (formData: LoginForm) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/users/login`, {
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
    if (formValidation()) {
      try {
        const data = await handleLogin(formData);
        if (data) {
          auth?.setUser({ email: data.email, fullName: data.fullName });
          auth?.setIsLoggedIn(true);
          toast.success("Signed In Successfully", { id: "login" })
          setFormData({ email: '', password: '' });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/chat")
    }
  }, [auth?.isLoggedIn, navigate])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined, // Clear the error for the input being typed into
    }));
  };

  return (
    <Box width={"100%"} height={"100%"} sx={{ display: "flex", itemsCenter: "center", maxWidth: "1200px", margin: "auto", marginTop: "50px", }}>
      {/* <Box display={{ md: "flex", sm: "none", xs: "none" }} flex={1} ml={{ xs: "0", md: "40px", lg: "0" }}>
        <img src="airobot.png" alt="Rowbot" style={{ maxWidth: "500px" }} />
      </Box> */}
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "40px", paddingTop: "40px", maxWidth: "450px", margin: "auto", width: "100%", position: "relative" }}>
              <CustomizedInput type="email" name="email" label="Email" onChange={handleChange} value={formData.email!} />
              <Typography style={{ color: "red", position: "absolute", top: "102px", fontSize: ".9em", left: "4px" }}>
                {errors.email}
              </Typography>
              <CustomizedInput type="password" name="password" label="Password" onChange={handleChange} value={formData.password!} />
              <Typography style={{ color: "red", position: "absolute", bottom: "-27px", fontSize: ".9rem", left: "4px" }}>
                {errors.password}
              </Typography>
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