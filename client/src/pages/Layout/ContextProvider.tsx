import React, { createContext, useState, useEffect, useContext } from "react";
import { apolloClient } from "../../services/ApolloClient.ts";
import { gql } from "@apollo/client";

interface user {
  sub: number;
  email: string;
  roles: [];
  permissions: [];
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: user | null;
  login: (user: user) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUser();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }

    async function fetchUser() {
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken from localStorage", accessToken);
      const VERIFY_ACCESS_TOKEN = gql`
        mutation VerifyAccessToken($accessToken: String!) {
          verifyAccessToken(accessToken: $accessToken) {
            sub
            email
            roles
            permissions
            iat
            exp
          }
        }
      `;

      const verify = (await apolloClient.mutate({
        mutation: VERIFY_ACCESS_TOKEN,
        variables: { accessToken },
      })) as { data: { verifyAccessToken: user } };

      console.log("verifyAccessToken response", verify.data);
      const userData = {
        sub: verify.data.verifyAccessToken.sub,
        email: verify.data.verifyAccessToken.email,
        roles: verify.data.verifyAccessToken.roles,
        permissions: verify.data.verifyAccessToken.permissions,
      };
      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);

  const login = (user: user) => {
    setUser(user);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
