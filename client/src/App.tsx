import { Routes, Route } from "react-router-dom";
import { Header, Home, Login, Signup, Chat } from "./components"
import { Box } from "@mui/material";


const App = () => {

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Box>
  )
}

export default App