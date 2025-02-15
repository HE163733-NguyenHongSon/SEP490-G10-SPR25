import React, { createContext, useState } from "react";

interface NavContextType {
    nav: string; 
    setNav: (nav: string) => void; 
  }
  
  interface NavProviderProps {
    children: React.ReactNode; 
  }
const NavContext = createContext<NavContextType | undefined>(undefined);
  
  
  const NavProvider: React.FC<NavProviderProps> = ({ children }) => {
    const [nav, setNav] = useState("Home");
  
    return (
      <NavContext.Provider value={{ nav, setNav }} >
        {children}
      </NavContext.Provider>
    );
  };
  export  {NavProvider,NavContext} ;
