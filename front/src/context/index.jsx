import React, { useState, useEffect } from "react";

const GlobalContext = React.createContext({});

export function GlobalContextProvider({ children }) {
  const [list, setList] = useState([]);
  const [filename, setFileName] = useState("test2.csv");

  useEffect(()=>{
    fetch('http://localhost:8080/files/list')
    .then(e=>e.json())
    .then(setList)
  },[])

  return (
    <GlobalContext.Provider
      value={{
        list,
        filename,
        setFileName
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;