import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { Button } from "@primereact/ui/button";

import {
  ALL_PERMISSIONS,
  PERMISSION_BY_ROLE_ID,
  ASSIGN_PERMISSIONS_TO_ROLE,
} from "../../services/Apis/Permissions";

interface Permission {
  id: number;
  permission_type: string;
}

interface RolePermission {
  Permission: Permission;
}

interface AllPermissionsData {
  permissions: Permission[];
}

interface RolePermissionsData {
  role: {
    id: number;
    name: string;
    rolesHasPermissions: RolePermission[];
  };
}

export function PermissionAssignToRole() {
  const location = useLocation();
  const roleId = location.state?.roleId;

  const [selected, setSelected] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: allPermissionsData,
    loading: allPermissionsLoading,
    error: allPermissionsError,
  } = useQuery(ALL_PERMISSIONS) as {
    data: AllPermissionsData;
    loading: boolean;
    error: any;
  };

  const {
    data: rolePermissionsData,
    loading: rolePermissionsLoading,
    error: rolePermissionsError,
  } = useQuery(PERMISSION_BY_ROLE_ID, { 
    variables: { id: Number(roleId) },
    skip: !roleId,
  }) as {
    data: RolePermissionsData;
    loading: boolean;
    error: any;
  };

  const [assignPermissionsToRole, { loading: assigning }] = useMutation(
    ASSIGN_PERMISSIONS_TO_ROLE,
  );

  const permissions = allPermissionsData?.permissions ?? [];

  useEffect(() => {
    if (rolePermissionsData?.role) {
      const assignedIds =
        rolePermissionsData.role.rolesHasPermissions.map(
          (item) => item.Permission.id,
        );

      setSelected(assignedIds);
    }
  }, [rolePermissionsData]);

  const handleCheckboxChange = (
    permissionId: number,
    checked: boolean,
  ) => {
    setSelected((previous) => {
      if (checked) {
        return previous.includes(permissionId)
          ? previous
          : [...previous, permissionId];
      }

      return previous.filter((id) => id !== permissionId);
    });
  };

  const handleAssignPermissions = async () => {
    if (!roleId) {
      setSuccessMessage(null);
      setErrorMessage("Role ID is missing. Please select a role first.");
      return;
    }

    if(selected.length === 0) {
      setSuccessMessage(null);
      setErrorMessage("Please select at least one permission to assign.");
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await assignPermissionsToRole({
        variables: {
          roleId: Number(roleId),
          permissionIds: selected.join(","),
        },
        refetchQueries: [
          {
            query: PERMISSION_BY_ROLE_ID,
            variables: { id: Number(roleId) },
          },
        ],
        awaitRefetchQueries: true,
      });

      setSuccessMessage("Permissions assigned successfully!");
    } catch (error) {
      console.error("Failed to assign permissions:", error);
      setErrorMessage("Failed to assign permissions. Please try again.");
    }
  };

  if (!roleId) {
    return (
      <div className="p-4 text-red-500">
        Role ID is missing. Please open this page from the roles list.
      </div>
    );
  }

  if (allPermissionsLoading || rolePermissionsLoading) {
    return <div className="p-4">Loading permissions...</div>;
  }

  if (allPermissionsError) {
    return (
      <div className="p-4 text-red-500">
        Error loading permissions: {allPermissionsError.message}
      </div>
    );
  }

  if (rolePermissionsError) {
    return (
      <div className="p-4 text-red-500">
        Error loading role permissions: {rolePermissionsError.message}
      </div>
    );
  }

  const roleName = rolePermissionsData?.role?.name ?? `Role #${roleId}`;

  return (
    <div className="p-4">
      <div className="surface-card border-round shadow-2 p-3 mt-4">
      
        <div className="flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="m-0">Assign Permissions to Role</h3>

            <p className="text-color-secondary text-sm mt-2 mb-0">
              Select permissions for <strong>{roleName}</strong>.
            </p>
          </div>

          <span className="text-color-secondary text-sm white-space-nowrap">
            {selected.length} selected
          </span>
        </div>

       
        {successMessage && (
          <div className="text-green-500 text-sm mb-3">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="text-red-500 text-sm mb-3">
            {errorMessage}
          </div>
        )}

        {permissions.length === 0 ? (
          <p className="text-color-secondary text-sm">
            No permissions available to assign.
          </p>
        ) : (
          <div
            className="flex flex-column gap-2 overflow-y-auto"
            style={{ maxHeight: "450px" }}
          >
            {permissions.map((permission) => (
              <label
                key={permission.id}
                className="flex align-items-center gap-2 px-3 py-2 border-1 border-200 border-round cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(permission.id)}
                  onChange={(event) =>
                    handleCheckboxChange(
                      permission.id,
                      event.target.checked,
                    )
                  }
                  className="cursor-pointer m-0 flex-shrink-0"
                />

                <span className="text-sm">
                  {permission.permission_type}
                </span>
              </label>
            ))}
          </div>
        )}

        {permissions.length > 0 && (
          <div className="flex justify-content-end mt-3">
            <Button
              disabled={assigning}
              onClick={handleAssignPermissions}
            >
              {assigning ? "Assigning..." : "Assign Permissions"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}