import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";


const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [Userdata, setUserdata] = useState();

  const addUser =async (Userfile) => {
   await setUserdata(Userfile);
  };
  
  return (
    <userContext.Provider value={{ addUser, Userdata }}>
      {children}
    </userContext.Provider>
  );
};

UserProvider.prototype = {
  children: PropTypes.node.isRequired,
};
export const useUser = () => {
  return (

    useContext(userContext)
    )
};
