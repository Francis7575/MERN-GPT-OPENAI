import { ReactNode, createContext, useContext, useState } from "react";

type User = {
  fullName: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (formData: User | null) => void
  setIsLoggedIn: (param: boolean) => void
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

const value = {
  user,
  isLoggedIn,
  setUser,
  setIsLoggedIn,
};
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);