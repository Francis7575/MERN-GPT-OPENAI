import { ReactNode, createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login

  }, []);

const logout = async () => { }

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