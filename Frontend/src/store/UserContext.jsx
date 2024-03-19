import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [contextUsername, setContextUsername] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    axios.get('/auth/profile').then((response) => {
      setId(response.data.id);
      setContextUsername(response.data.username);
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ contextUsername, id, setContextUsername, setId }}
    >
      {children}
    </UserContext.Provider>
  );
}
