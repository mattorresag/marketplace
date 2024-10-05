import React, { useState, ReactNode, useEffect } from "react";
import { Company, IAuthContextUser, User } from "../../interfaces/User";
import { AuthContext } from "./AuthContext";
import { deleteCookie, setCookie } from "cookies-next";
import { decodeToken } from "../../utils/auth";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleLogin = async ({
    token,
    clients,
  }: {
    token: string;
    clients: any[];
  }) => {
    const decoded = decodeToken(token);
    if (!decoded) return;
    setCookie("@ecommerce/authToken", token);
    handleSetUser({
      ...decoded.user,
      companies: clients,
    });
  };

  const handleSetUser = (user: User | null) => {
    setUser(user);
  };
  const handleSetSelectedCompany = (company: Company | null) => {
    setSelectedCompany(company);
    setCookie("@ecommerce/company", company);
  };

  const logout = () => {
    deleteCookie("@ecommerce/authToken");
    deleteCookie("@ecommerce/company");
    handleSetUser(null);
    handleSetSelectedCompany(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        handleLogin,
        handleSetUser,
        selectedCompany,
        handleSetSelectedCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
