
import React from "react";
import { usePermission } from "./PermissionProvider ";

interface GuardProps {
  requiredPermission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Guard: React.FC<GuardProps> = ({
  requiredPermission,
  children,
  fallback = null,
}) => {
  const { hasPermission } = usePermission();

  const permissions = Array.isArray(requiredPermission)
    ? requiredPermission
    : [requiredPermission];

  if (!permissions.some((permission) => hasPermission(permission))) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
