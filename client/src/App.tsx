import { Routes, Route } from "react-router-dom";
import { Header, Home, Login, Signup, Chat, NotFound } from "./components"
import { useAuth } from "./context/authContext";

const App = () => {
  const auth = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn &&  (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App