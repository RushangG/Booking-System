import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { Button } from "@primereact/ui/button";
import {
  ALL_ROLES,
  ROLE_BY_ID,
  ASSIGN_ROLES_TO_USER,
} from "../../services/Apis/Role";
import { Guard } from "../Layout/Guard.tsx";
interface Role {
  id: number;
  name: string;
  description: string;
}

interface UserRole {
  Role: Role;
}

export function AssignRoleToUser() {
  const location = useLocation();
  const userId = location.state?.userId;

  const [selected, setSelected] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    loading: allRolesLoading,
    error: allRolesError,
    data: allRolesData,
  } = useQuery(ALL_ROLES) as {} as {
    loading: boolean;
    error: Error | undefined;
    data: {
      roles: Role[];
    };
  };

  const { data: userRolesData } = useQuery(ROLE_BY_ID, {
    variables: { id: Number(userId) },
  }) as {
    data: { user: { usersHasRoles: UserRole[] } };
  };

  const [assignRolesToUser] = useMutation(ASSIGN_ROLES_TO_USER);

  const roles: Role[] = allRolesData?.roles.map((role: Role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
  }));

  const userRoles: Role[] =
    userRolesData?.user?.usersHasRoles.map(
      (userRole: UserRole) => userRole.Role,
    ) || [];

  useEffect(() => {
    if (userRolesData?.user?.usersHasRoles) {
      const assignedRoleIds = userRoles.map((role) => role.id);
      setSelected(assignedRoleIds);
    }
  }, [userRolesData]);

  const handleCheckboxChange = (roleId: number, checked: boolean) => {
    if (checked) {
      setSelected((prev) => (prev.includes(roleId) ? prev : [...prev, roleId]));
    } else {
      setSelected((prev) => prev.filter((id) => id !== roleId));
    }
  };

  const handleAssignUsers = async () => {
    if (selected.length === 0) {
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      let result = (await assignRolesToUser({
        variables: {
          userId: Number(userId),
          roleIds: selected.join(","),
        },
      })) as { data: { assignRolesToUser: { id: number } } };

      if (result.data && result.data.assignRolesToUser) {
        setErrorMessage(null);
        setSuccessMessage("Roles assigned successfully!");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage("Failed to assign roles. Please try again.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      console.error("Failed to assign users:", error);
    }
  };

  if (allRolesLoading) return <div>Loading...</div>;
  if (allRolesError) return <div>Error: {allRolesError.message}</div>;

  return (
    <>
      <Guard
        requiredPermission={["admin:assign-role"]}
        fallback={<p>You do not have permission to view this page.</p>}
      >
        <div className="p-4">
          <div className="surface-card border-round shadow-2 p-3 mt-4">
            <div className="flex justify-content-between align-items-center mb-3">
              <div>
                <h3 className="m-0">Assign Roles to User</h3>

                <p className="text-color-secondary mt-2 mb-0">
                  Select roles you want to assign to this user.
                </p>
              </div>

              <span className="text-green-500">{successMessage}</span>
              <span className="text-red-500">{errorMessage}</span>

              <span className="text-color-secondary">
                {selected.length} selected
              </span>
            </div>

            {roles.length === 0 ? (
              <p className="text-color-secondary">
                No roles available to assign.
              </p>
            ) : (
              <div className="flex flex-column gap-2">
                {roles.map((role) => {
                  const isSelected = selected.includes(role.id);

                  return (
                    <label
                      key={role.id}
                      htmlFor={`role-${role.id}`}
                      className="flex align-items-center gap-3 px-3 py-2 border-1 border-200 border-round cursor-pointer"
                    >
                      <input
                        id={`role-${role.id}`}
                        type="checkbox"
                        checked={isSelected}
                        onChange={(event) =>
                          handleCheckboxChange(role.id, event.target.checked)
                        }
                        className="cursor-pointer m-0 flex-shrink-0"
                      />

                      <div className="flex flex-column">
                        <span className="font-medium">{role.name}</span>

                        <span className="text-color-secondary text-sm">
                          {role.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {roles.length > 0 && (
              <div className="flex justify-content-end mt-4">
                <Button
                  disabled={selected.length === 0}
                  onClick={handleAssignUsers}
                >
                  Assign Roles
                </Button>
              </div>
            )}
          </div>
        </div>
      </Guard>
    </>
  );
}
