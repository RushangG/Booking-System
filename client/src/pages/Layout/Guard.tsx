import React from "react";
import { usePermission } from "./PermissionProvider ";

interface GuardProps {
  requiredPermission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Guard: React.FC<GuardProps> = ({
  requiredPermission,
  children,
  fallback = null,
}) => {
  const { hasPermission } = usePermission();

  // stop rendering the children if the user does not have the required permission
  if (!hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
