import {
  ALL_PERMISSIONS,
  PERMISSION_BY_ROLE_ID,
  ASSIGN_PERMISSIONS_TO_ROLE,
} from "../../services/Apis/Permissions";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";

interface Permission {
  id: number;
  permission_type: string;
}

export function PermissionAssignToRole() {
  const location = useLocation();
  const roleId = location.state?.roleId;

  const {
    data: allPermissionsData,
    loading: allPermissionsLoading,
    error: allPermissionsError,
  } = useQuery(ALL_PERMISSIONS) as {
    data: { permissions: Permission[] };
    loading: boolean;
    error: Error | undefined;
  };

  const {
    data: rolePermissionsData,
    loading: rolePermissionsLoading,
    error: rolePermissionsError,
  } = useQuery(PERMISSION_BY_ROLE_ID, {
    variables: { id: roleId }, // Replace with the actual role ID you want to fetch permissions for
  }) as {
    data: {
      role: {
        name: string;
        id: number;
        rolesHasPermissions: { Permission: Permission }[];
      };
    };
    loading: boolean; 
    error: Error | undefined;
  };

  const [assignPermissionsToRole] = useMutation(ASSIGN_PERMISSIONS_TO_ROLE);

  function handleAssignPermissions(permissionIds: number[]) {
    const permissionIdsString = permissionIds.join(",");
    assignPermissionsToRole({
      variables: { roleId: roleId, permissionIds: permissionIdsString },
    });
  }

  return (
    <div>
      <h1>Permission Assign To Role Page</h1>
      {allPermissionsData?.permissions?.map((permission: Permission) => (
        <div key={permission.id}>
          <p>{permission.permission_type}</p>
        </div>
      ))}

      <h2>Permissions for Role: {rolePermissionsData?.role?.name}</h2>
      {rolePermissionsData?.role?.rolesHasPermissions?.map((rolePermission) => (
        <div key={rolePermission.Permission.id}>
          <p>{rolePermission.Permission.permission_type}</p>
        </div>
      ))}
    </div>
  );
}
