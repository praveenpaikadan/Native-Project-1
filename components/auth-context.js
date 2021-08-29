import { createContext } from "react";

export const AuthContext = createContext({
  storedCredentials: {},
  setStoredCredentials: () => {},
  
});
