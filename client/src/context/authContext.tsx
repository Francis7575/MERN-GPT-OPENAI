import { ReactNode, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => Promise<void>
  setUser: (formData: User) => void
  setIsLoggedIn: (param: boolean) => void
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
      method: "GET",
      headers: {'Content-Type': "application/json"},
      credentials: "include"
    })
    const data = await response.json()
    setIsLoggedIn(false)
    toast.success("Succesfully Logged out", { id: "userLogout" });
    return data;
  } catch (error) {
    console.error("Error logging out:", error);
    toast.error("Unable to logout", { id: "userLogout" });
  }
}

const value = {
  user,
  isLoggedIn,
  setUser,
  setIsLoggedIn,
  logout
};
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);