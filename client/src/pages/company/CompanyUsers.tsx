import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useMutation, useQuery } from "@apollo/client/react";

import {
  GET_COMPANY_USERS,
  ASSIGN_USERS_TO_COMPANY,
  REMOVE_USER_FROM_COMPANY,
} from "../../services/Apis/Company.ts";

import { USERS_NOT_IN_COMPANY } from "../../services/Apis/Users.ts";
import { Guard } from "../Layout/Guard.tsx";

interface Iuser {
  id: number;
  createdAt: string;
  name: string;
  email: string;
}

interface CompanyUsersData {
  company: {
    id: number;
    name: string;
    companiesHasUsers: {
      user: Iuser;
    }[];
  };
}

interface UsersNotInCompanyData {
  usersNotInCompany: Iuser[];
}

export function CompanyUsers() {
  const location = useLocation();

  const companyId = location.state?.companyId;

  const [selected, setSelected] = useState<number[]>([]);

  const { data: companyUsersData, refetch: refetchCompanyUsers } = useQuery(
    GET_COMPANY_USERS,
    {
      variables: {
        id: Number(companyId),
      },
      fetchPolicy: "network-only",
    },
  ) as {
    data: CompanyUsersData;

    refetch: () => Promise<any>;
  };

  const { data: availableUsersData, refetch: refetchAvailableUsers } = useQuery(
    USERS_NOT_IN_COMPANY,
    {
      variables: {
        companyId: Number(companyId),
      },
      fetchPolicy: "network-only",
    },
  ) as {
    data: UsersNotInCompanyData;

    refetch: () => Promise<any>;
  };

  const [assignUsersToCompany, { loading: assigning }] = useMutation(
    ASSIGN_USERS_TO_COMPANY,
  );

  if (!companyId) {
    return <p>Company ID not found</p>;
  }

  const [removeUserFromCompany] = useMutation(REMOVE_USER_FROM_COMPANY);

  const users: Iuser[] =
    companyUsersData?.company?.companiesHasUsers?.map((item) => item.user) ??
    [];

  const availableUsers: Iuser[] = availableUsersData?.usersNotInCompany ?? [];

  const handleCheckboxChange = (userId: number, checked: boolean) => {
    if (checked) {
      setSelected((prev) => [...prev, userId]);
    } else {
      setSelected((prev) => prev.filter((id) => id !== userId));
    }
  };

  const handleAssignUsers = async () => {
    if (selected.length === 0) {
      return;
    }

    let currentUserIds = users.map((user) => user.id);

    let allUserIds = [...currentUserIds, ...selected];

    try {
      await assignUsersToCompany({
        variables: {
          companyId: Number(companyId),

          userId: allUserIds.join(","),
        },
      });

      setSelected([]);

      await refetchCompanyUsers();

      await refetchAvailableUsers();
    } catch (error) {
      console.error("Failed to assign users:", error);
    }
  };

  async function handleRemoveUserFromCompany(removeUserId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user from the company?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await removeUserFromCompany({
        variables: {
          companyId: Number(companyId),
          userId: Number(removeUserId),
        },
      });

      await refetchCompanyUsers();

      await refetchAvailableUsers();
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  }

  return (
    <Guard
      requiredPermission={["company:assign-users"]}
      fallback={
        <p>You do not have permission to manage users for this company.</p>
      }
    >
      <div className="p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold m-0">
              Manage Users for Company: {companyUsersData?.company?.name}
            </h2>

            <p className="text-color-secondary mt-2 mb-0">
              Assign and manage users associated with this company
            </p>
          </div>
        </div>

        <div className="surface-card border-round shadow-2 p-3">
          <div className="flex justify-content-between align-items-center mb-3">
            <h3 className="m-0">Company Users</h3>

            <span className="text-color-secondary">{users.length} users</span>
          </div>

          {users.length === 0 ? (
            <p className="text-color-secondary">
              No users assigned to this company.
            </p>
          ) : (
            <DataTable.Root data={users}>
              <DataTable.TableContainer>
                <DataTable.Table>
                  <DataTable.THead>
                    <DataTable.THeadRow>
                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>No.</DataTable.THeadTitle>
                      </DataTable.THeadCell>

                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Name</DataTable.THeadTitle>
                      </DataTable.THeadCell>

                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Email</DataTable.THeadTitle>
                      </DataTable.THeadCell>

                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Created At</DataTable.THeadTitle>
                      </DataTable.THeadCell>

                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                      </DataTable.THeadCell>
                    </DataTable.THeadRow>
                  </DataTable.THead>

                  <DataTable.TBody>
                    {({ item, index }: { item: Iuser; index: number }) => (
                      <DataTable.Row key={item.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>

                        <DataTable.Cell>
                          <span className="font-medium">{item.name}</span>
                        </DataTable.Cell>

                        <DataTable.Cell>{item.email}</DataTable.Cell>

                        <DataTable.Cell>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </DataTable.Cell>

                        <DataTable.Cell>
                          <div className="flex gap-2">
                            <Button
                              severity="danger"
                              size="small"
                              rounded
                              text
                              onClick={() =>
                                handleRemoveUserFromCompany(item.id)
                              }
                            >
                              Remove
                            </Button>
                          </div>
                        </DataTable.Cell>
                      </DataTable.Row>
                    )}
                  </DataTable.TBody>
                </DataTable.Table>
              </DataTable.TableContainer>
            </DataTable.Root>
          )}
        </div>

        <div className="surface-card border-round shadow-2 p-3 mt-4">
          <div className="flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="m-0">Add Users to Company</h3>

              <p className="text-color-secondary mt-2 mb-0">
                Select users you want to assign to this company.
              </p>
            </div>

            <span className="text-color-secondary">
              {selected.length} selected
            </span>
          </div>

          {availableUsers.length === 0 ? (
            <p className="text-color-secondary">
              No users available to assign.
            </p>
          ) : (
            <div className="flex flex-column gap-3">
              {availableUsers.map((user) => {
                const isSelected = selected.includes(user.id);

                return (
                  <div
                    key={user.id}
                    className="flex align-items-center gap-3 p-3 border-1 border-200 border-round"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(event) =>
                        handleCheckboxChange(user.id, event.target.checked)
                      }
                      className="cursor-pointer"
                    />

                    <div className="flex flex-column">
                      <span className="font-medium">{user.name}</span>

                      <span className="text-color-secondary text-sm">
                        {user.email}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {availableUsers.length > 0 && (
            <div className="flex justify-content-end mt-4">
              <Button
                label={assigning ? "Assigning..." : "Assign Users"}
                disabled={selected.length === 0 || assigning}
                onClick={handleAssignUsers}
              >
                Assign Users
              </Button>
            </div>
          )}
        </div>
      </div>
    </Guard>
  );
}
