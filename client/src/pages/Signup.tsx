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
  const [errors, setErrors] = useState<SignupForm>({});

  const formValidation = () => {
    const { fullName, email, password } = formData;
    const newErrors: SignupForm = {};

    if (!fullName) {
      newErrors.fullName = 'Fullname cannot be empty';
    } else if (fullName.split(' ').length < 2) {
      newErrors.fullName = 'Please enter your first and last name';
    }

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

  const handleSignup = async (formData: SignupForm) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/users/signup`, {
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
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/chat")
    }
  }, [auth?.isLoggedIn])

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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "40px", paddingTop: "40px", maxWidth: "450px", margin: "auto", width: "100%", position: "relative" }}>
              <CustomizedInput type="name" name="fullName" label="Fullname" onChange={handleChange} value={formData.fullName!} />
              <Typography style={{ color: "red", position: "absolute", top: "102px", fontSize: ".9em", left: "4px" }}>
                {errors.fullName}
              </Typography>
              <CustomizedInput type="email" name="email" label="Email" onChange={handleChange} value={formData.email!} />
              <Typography style={{ color: "red", position: "absolute", top: "200px", fontSize: ".9em", left: "4px" }}>
                {errors.email}
              </Typography>
              <CustomizedInput type="password" name="password" label="Password" onChange={handleChange} value={formData.password!} />
              <Typography style={{ color: "red", position: "absolute", top: "292px", fontSize: ".9em", left: "4px" }}>
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