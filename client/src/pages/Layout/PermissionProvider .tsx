import React, { useContext, createContext } from "react";

interface PermissionContextType {
  permissions: string[];
  hasPermission: (permission: string) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined,
);

interface PermissionProviderProps {
  userPermission: string[];
  children: React.ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  userPermission,
  children,
}) => {
  const hasPermission = (permission: string) =>
    userPermission.includes(permission);

  return (
    <PermissionContext.Provider
      value={{ permissions: userPermission, hasPermission }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }

  return context;
};
