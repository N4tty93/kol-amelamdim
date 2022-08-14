import React from 'react';

interface AuthContextTypes {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextTypes>({
  isAuthenticated: false,
  setAuthenticated: () => null,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
