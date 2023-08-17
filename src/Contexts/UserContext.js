import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export function MyContextProvider({children}) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const updateData = newdata => {
    setIsUserLoggedIn(newdata);
  };

  return (
    <UserContext.Provider value={{isUserLoggedIn, updateData}}>
      {children}
    </UserContext.Provider>
  );
}

export function useMyContext() {
  return useContext(UserContext);
}
