import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  });
  return (
    <>
      <userContext.Provider value={{ userToken, setUserToken }}>
        {children}
      </userContext.Provider>
    </>
  );
}
