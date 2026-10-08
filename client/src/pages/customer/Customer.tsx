import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@primereact/ui/button";
import { DataTable } from "@primereact/ui/datatable";
import { CUSTOMER_ALL, DELETE_CUSTOMER } from "../../services/Apis/Customer";
import { useQuery, useMutation } from "@apollo/client/react";
import { Guard } from "../Layout/Guard";
type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export function Customer() {
  const location = useLocation();
  const companyId = location.state?.companyId;
  console.log("Company ID from state:", companyId);
  const navigate = useNavigate();

  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const { loading, error, data } = useQuery(CUSTOMER_ALL) as {
    loading: boolean;
    error: Error | undefined;
    data: { customerAll: Customer[] };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Customer data:", data.customerAll);

  const customers: Customer[] = data.customerAll.map((customer: Customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
  }));

  function handleDeleteCustomer(id: number) {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: CUSTOMER_ALL }],
        awaitRefetchQueries: true,
      });
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold m-0">Customers</h2>

          <p className="text-color-secondary mt-2 mb-0">Manage customers</p>
        </div>

        <Guard requiredPermission="customers:view">
          <Button
            label="Add Customer"
            onClick={() => navigate("/customer-add-edit")}
          >
            Add
          </Button>
        </Guard>
      </div>

      <div className="surface-card border-round shadow-2 p-3">
        <DataTable.Root data={customers}>
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
                    <DataTable.THeadTitle>Phone</DataTable.THeadTitle>
                  </DataTable.THeadCell>

                  <DataTable.THeadCell>
                    <DataTable.THeadTitle>Actions</DataTable.THeadTitle>
                  </DataTable.THeadCell>
                </DataTable.THeadRow>
              </DataTable.THead>

              <DataTable.TBody>
                {({ item, index }: { item: Customer; index: number }) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{index + 1}</DataTable.Cell>

                    <DataTable.Cell>
                      <span className="font-medium">{item.name}</span>
                    </DataTable.Cell>

                    <DataTable.Cell>{item.email}</DataTable.Cell>

                    <DataTable.Cell>{item.phone}</DataTable.Cell>

                    <DataTable.Cell>
                      <div className="flex gap-2">
                        <Button
                          severity="info"
                          size="small"
                          rounded
                          text
                          onClick={() =>
                            navigate("/customer-add-edit", {
                              state: { customer: item },
                            })
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          severity="danger"
                          size="small"
                          rounded
                          text
                          onClick={() => handleDeleteCustomer(item.id)}
                        >
                          Delete
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
