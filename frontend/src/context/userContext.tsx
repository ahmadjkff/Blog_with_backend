import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface UserContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  role: string;
  login: (username: string, token: string, role: "admin" | "user") => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRole] = useState<string>(localStorage.getItem("role") || "");

  const isAuthenticated = !!token;

  const isAdmin = role === "admin" ? true : false;

  const login = (username: string, token: string, role: "admin" | "user") => {
    setUsername(username);
    setToken(token);
    setRole(role);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setUsername(null);
    setToken(null);
    setRole("");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <UserContext.Provider
      value={{
        username,
        token,
        isAuthenticated,
        isAdmin,
        role,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
