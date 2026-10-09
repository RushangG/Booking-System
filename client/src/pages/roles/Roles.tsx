import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useQuery } from "@apollo/client/react";
import { ALL_ROLES } from "../../services/Apis/Role";

interface Role {
  id: number;
  name: string;
  description: string;
}

export function Roles() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(ALL_ROLES) as {
    data: { roles: Role[] };
    loading: boolean;
    error: Error | undefined;
  };

  const roles: Role[] = data?.roles || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold m-0">Roles</h2>

          <p className="text-color-secondary mt-2 mb-0">
            Manage roles permissions
          </p>
        </div>
      </div>

      <div className="surface-card border-round shadow-2 p-3">
        <DataTable.Root data={roles}>
          <DataTable.TableContainer>
            <DataTable.Table>
              <DataTable.THead>
                <DataTable.THeadRow>
                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>No.</DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>Role Name</DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>Description</DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                  </DataTable.THeadCell>
                </DataTable.THeadRow>
              </DataTable.THead>

              <DataTable.TBody>
                {({ item, index }: { item: Role; index: number }) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>

                    <DataTable.Cell>
                      <span className="font-medium">{item.name}</span>
                    </DataTable.Cell>

                    <DataTable.Cell>{item.description}</DataTable.Cell>

                    <DataTable.Cell>
                      <div className="flex gap-2">
                        <Button
                          severity="warning"
                          size="small"
                          rounded
                          onClick={() =>
                            navigate("/permission-assign-to-role", {
                              state: { roleId: item.id },
                            })
                          }
                        >
                          Assign Permission
                        </Button>
                      </div>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </DataTable.TBody>
            </DataTable.Table>
          </DataTable.TableContainer>
        </DataTable.Root>
      </div>
    </div>
  );
}
