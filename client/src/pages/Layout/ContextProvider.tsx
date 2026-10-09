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
  login: () => Promise<void>;
  logout: () => void;
  loading: boolean;
  companyId: number | null;
  setCompany: (id: number) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  loading: true,
  companyId: null,
  setCompany: (id: number) => {},
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [companyId, setCompanyId] = useState<number | null>(null);

  async function fetchUser() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      console.log("Checking access token...");

      const VERIFY_ACCESS_TOKEN = gql`
        mutation VerifyAccessToken($accessToken: String!) {
          verifyAccessToken(accessToken: $accessToken) {
            sub
            email
            roles
            permissions
          }
        }
      `;
      const verify = (await apolloClient.mutate({
        mutation: VERIFY_ACCESS_TOKEN,
        variables: {
          accessToken,
        },
      })) as {
        data: {
          verifyAccessToken: user;
        };
      };

      const verifiedUser = verify.data.verifyAccessToken;

      setUser({
        sub: verifiedUser.sub,
        email: verifiedUser.email,
        roles: verifiedUser.roles,
        permissions: verifiedUser.permissions,
      });

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Token verification failed:", error);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUser();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const login = async () => {
    await fetchUser();
  };

  const setCompany = (id: number) => {
    setCompanyId(id);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

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
        companyId,
        setCompany,
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
