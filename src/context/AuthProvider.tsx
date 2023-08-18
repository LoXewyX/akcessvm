import React, { createContext, useState } from 'react';
import { IAuth } from '../api/models';

interface AuthContextType {
  auth?: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

const AuthContext = createContext<AuthContextType>({ auth: {}, setAuth: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
