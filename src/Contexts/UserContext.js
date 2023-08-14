import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext(null);

export function MyContextProvider({children}) {
  const [data, setData] = useState('');

  const updateData = newdata => {
    setData(newdata);
  };

  return (
    <UserContext.Provider value={{data, updateData}}>
      {children}
    </UserContext.Provider>
  );
}

export function useMyContext() {
  return useContext(UserContext);
}
