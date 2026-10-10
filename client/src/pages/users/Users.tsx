import { useNavigate } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { useQuery, useMutation } from "@apollo/client/react";
import { USER_ALL, DELETE_USER } from "../../services/Apis/Users";
import { Guard } from "../Layout/Guard";
type User = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
};

export function Users() {
  const navigate = useNavigate();

  const [deleteUser] = useMutation(DELETE_USER);

  const { loading, error, data } = useQuery(USER_ALL) as {
    loading: boolean;
    error: Error | undefined;
    data: {
      users: User[];
    };
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log("Users data:", data.users);

  const users: User[] = data.users.map((user: User) => ({
    id: user.id,
    createdAt: user.createdAt,
    name: user.name,
    email: user.email,
  }));

  function handleDeleteUser(id: number) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: USER_ALL }],
        awaitRefetchQueries: true,
      });
    }
  }

  return (
    <Guard
      requiredPermission={["users:view"]}
      fallback={<p>You do not have permission to view this page.</p>}
    >
      <div className="p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold m-0">Users</h2>

            <p className="text-color-secondary mt-2 mb-0">Manage users</p>
          </div>

          <Guard requiredPermission={["users:create"]}>
            <Button label="Add User" onClick={() => navigate("/user-add-edit")}>
              Add
            </Button>
          </Guard>
        </div>

        <div className="surface-card border-round shadow-2 p-3">
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

                    <Guard
                      requiredPermission={[
                        "users:update",
                        "users:delete",
                        "admin:assign-role",
                      ]}
                    >
                      <DataTable.THeadCell>
                        <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                      </DataTable.THeadCell>
                    </Guard>
                  </DataTable.THeadRow>
                </DataTable.THead>

                <DataTable.TBody>
                  {({ item, index }: { item: User; index: number }) => (
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
                          <Guard requiredPermission={["users:update"]}>
                            <Button
                              severity="info"
                              size="small"
                              rounded
                              text
                              onClick={() =>
                                navigate("/user-add-edit", {
                                  state: {
                                    user: item,
                                  },
                                })
                              }
                            >
                              Edit
                            </Button>
                          </Guard>

                          <Guard requiredPermission={["users:delete"]}>
                            <Button
                              severity="danger"
                              size="small"
                              rounded
                              text
                              onClick={() => handleDeleteUser(item.id)}
                            >
                              Delete
                            </Button>
                          </Guard>

                          <Guard requiredPermission={["admin:assign-role"]}>
                            <Button
                              severity="success"
                              size="small"
                              rounded
                              text
                              onClick={() =>
                                navigate("/assign-role-to-user", {
                                  state: {
                                    userId: item.id,
                                  },
                                })
                              }
                            >
                              Assign Role
                            </Button>
                          </Guard>
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
    </Guard>
  );
}
