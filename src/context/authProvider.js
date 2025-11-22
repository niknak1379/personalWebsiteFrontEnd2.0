import { createContext, useContext, useState } from "react";
import { ServerEndpoint } from "../utils/endpoints";
const AuthConext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setToken] = useState(null);
  const [trust, setTrust] = useState(
    JSON.parse(localStorage.getItem("trust")) || false
  ); //to decide wether this device is trusted or not
  const [baseURL, setURL] = useState(`${ServerEndpoint}`);

  console.log("context being created", baseURL);
  return (
    <AuthConext.Provider
      value={{ accessToken, setToken, trust, setTrust, baseURL }}
    >
      {children}
    </AuthConext.Provider>
  );
};

export default AuthConext;
